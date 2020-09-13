---
title: "Postgres JSONB: Updating data inside an array of objects"
date: "2020-09-13"
---

# Postgres JSONB: Updating data inside an aray of objects

Recently I had the challenge to update data inside of an array of objects within a JSONB column.

Given the following two tables

```sql
CREATE TABLE contract (
    id BIGINT PRIMARY KEY,
    json_data JSONB NOT NULL
);

CREATE TABLE invoice (
    id BIGINT PRIMARY KEY,
    json_data JSONB NOT NULL
);
```

In this example an invoice has different items and each item can belong to a different contract.
Let's have a look at some example data.

```json
-- contract
{
    "id": 1,
    "customerId": 123
}

-- invoice

{
    "id": 15,
    "items": [
        {
            "contractId": 1,
            "prize": 123
        },
        {
            "contractId": 2,
            "prize": 456
        }
    ]
}
```

What we wanted to do is add the customer id, based on the contract id, to the items.

Postgres offers a `jsonb_set` function for updating JSON fields.

`jsonb_set(target jsonb, path text[], new_value jsonb [, create_missing boolean])`

The second parameter `path` defines, which property you want to update.
To update items in an array, you can use an index-based approach.

To update the first entry in the items array in the example above, a path woud look like this: `{items, 0, customerId}`.
This sets the field "customerId" at index 0 (first entry) in the array named items.

Let's have a look at the update query before breaking it down.

```sql 
WITH item AS (
    SELECT ('{items,' || index - 1 || ',"customerId"}')::TEXT[] AS path,
           id,
           (SELECT (json_data ->> 'customerId')::BIGINT FROM contract where id = (item ->> 'contractId')::BIGINT ) AS customerId
    FROM invoice,
         jsonb_array_elements(json_data -> 'items') WITH ORDINALITY arr(item, index)
    WHERE item ->> 'contractId' IS NOT NULL
)
UPDATE invoice i
SET json_data = jsonb_set(json_data, item.path, to_json(item.customerId)::JSONB)
FROM item
WHERE i.id = item.id;
```

## Breaking it down

```sql
-- The basic value of SELECT in WITH is to break down complicated queries into simpler parts. 
WITH item AS (
    
    SELECT 
    -- dynamically concat the JSONB path. {items,<index>,customerId} (sets the field custmerId in the array named items at the index number), aliased as path for easier reference
    ('{items,' || index - 1 || ',"customerId"}')::TEXT[] AS path,
    -- We need the id for updating the correct entry later
    id,
    -- Subquery to select the customerId based on the contract id, aliased as customerId for easier reference
    (SELECT (json_data ->> 'customerId')::BIGINT FROM contract where id = (item ->> 'contractId')::BIGINT ) AS customerId
    -- source table
    FROM invoice,
    -- flatten the array using jsonb_array_elements and allow access for both, the item itself (so you can access the properties of the item object) and the index using WITH ORDINALITY 
    jsonb_array_elements(json_data -> 'items') WITH ORDINALITY arr(item, index)
)
-- Now we actually start updating the invoices
UPDATE invoice i
-- item is the name of the with-subquery above, we can now access the dynamically built path and selected customer id
SET json_data = jsonb_set(json_data, item.path, to_json(item.customerId)::JSONB)
-- reference the with-query above
FROM item
WHERE i.id = item.id;
```

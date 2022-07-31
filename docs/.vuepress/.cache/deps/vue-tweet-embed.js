import {
  __commonJS,
  init_define_EXTERNAL_LINK_ICON_LOCALES,
  init_define_MZ_ZOOM_OPTIONS
} from "./chunk-JQISXBHW.js";

// node_modules/vue-tweet-embed/dist/core/index.js
var require_core = __commonJS({
  "node_modules/vue-tweet-embed/dist/core/index.js"(exports, module) {
    "use strict";
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    init_define_MZ_ZOOM_OPTIONS();
    var addScriptPromise = 0;
    function addPlatformScript(src) {
      if (!addScriptPromise) {
        var s = document.createElement("script");
        s.setAttribute("src", src);
        document.body.appendChild(s);
        addScriptPromise = new Promise(function(resolve) {
          s.onload = function() {
            resolve(window.twttr);
          };
        });
      }
      return addScriptPromise;
    }
    var defaultProps = {
      id: {
        type: String,
        required: true
      },
      sourceType: {
        type: String
      },
      slug: {
        type: String
      },
      options: Object
    };
    var twitterEmbedComponent = function twitterEmbedComponent2(me) {
      return {
        data: function data() {
          return {
            isLoaded: false,
            isAvailable: false
          };
        },
        props: Object.assign({}, defaultProps, me.props),
        mounted: function mounted() {
          var _this = this;
          var params;
          if (this.sourceType === "profile") {
            params = {
              sourceType: this.sourceType,
              screenName: this.id
            };
          } else if (this.sourceType === "list") {
            params = {
              sourceType: this.sourceType,
              ownerScreenName: this.id,
              slug: this.slug
            };
          } else {
            params = this.id;
          }
          Promise.resolve(window.twttr ? window.twttr : addPlatformScript("//platform.twitter.com/widgets.js")).then(function(twttr) {
            return me.embedComponent(twttr, params, _this.$el, _this.options);
          }).then(function(data) {
            _this.isAvailable = data !== void 0;
            _this.isLoaded = true;
          });
        },
        render: function render(h) {
          if (this.isLoaded && this.isAvailable) {
            return h("div", {
              class: this.$props.widgetClass
            });
          }
          if (this.isLoaded && !this.isAvailable && this.$props.errorMessage) {
            var $errorMsg = h("div", {
              class: this.$props.errorMessageClass,
              domProps: {
                innerHTML: this.$props.errorMessage
              }
            });
            return h("div", [$errorMsg]);
          }
          return h("div", {
            class: this.$props.widgetClass
          }, this.$slots.default);
        }
      };
    };
    module.exports = {
      addPlatformScript,
      twitterEmbedComponent
    };
  }
});

// node_modules/vue-tweet-embed/dist/tweet/index.js
var require_tweet = __commonJS({
  "node_modules/vue-tweet-embed/dist/tweet/index.js"(exports) {
    "use strict";
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    init_define_MZ_ZOOM_OPTIONS();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _core = require_core();
    var Tweet = (0, _core.twitterEmbedComponent)({
      embedComponent: function embedComponent(twttr) {
        var _twttr$widgets;
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return (_twttr$widgets = twttr.widgets).createTweetEmbed.apply(_twttr$widgets, args);
      },
      props: {
        errorMessage: {
          type: String,
          default: "Whoops! We couldn't access this Tweet."
        },
        errorMessageClass: {
          type: String,
          required: false
        },
        widgetClass: {
          type: String,
          required: false
        }
      }
    });
    var _default = Tweet;
    exports.default = _default;
  }
});

// node_modules/vue-tweet-embed/dist/moment/index.js
var require_moment = __commonJS({
  "node_modules/vue-tweet-embed/dist/moment/index.js"(exports) {
    "use strict";
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    init_define_MZ_ZOOM_OPTIONS();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _core = require_core();
    var Moment = (0, _core.twitterEmbedComponent)({
      embedComponent: function embedComponent(twttr) {
        var _twttr$widgets;
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return (_twttr$widgets = twttr.widgets).createMoment.apply(_twttr$widgets, args);
      },
      props: {
        errorMessage: {
          type: String,
          default: "Whoops! We couldn't access this Moment."
        },
        errorMessageClass: {
          type: String,
          required: false
        },
        widgetClass: {
          type: String,
          required: false
        }
      }
    });
    var _default = Moment;
    exports.default = _default;
  }
});

// node_modules/vue-tweet-embed/dist/timeline/index.js
var require_timeline = __commonJS({
  "node_modules/vue-tweet-embed/dist/timeline/index.js"(exports) {
    "use strict";
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    init_define_MZ_ZOOM_OPTIONS();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _core = require_core();
    var Timeline = (0, _core.twitterEmbedComponent)({
      embedComponent: function embedComponent(twttr) {
        var _twttr$widgets;
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        return (_twttr$widgets = twttr.widgets).createTimeline.apply(_twttr$widgets, args);
      },
      props: {
        errorMessage: {
          type: String,
          default: "Whoops! We couldn't access this Timeline."
        },
        errorMessageClass: {
          type: String,
          required: false
        },
        widgetClass: {
          type: String,
          required: false
        }
      }
    });
    var _default = Timeline;
    exports.default = _default;
  }
});

// node_modules/vue-tweet-embed/dist/index.js
var require_dist = __commonJS({
  "node_modules/vue-tweet-embed/dist/index.js"(exports) {
    "use strict";
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    init_define_MZ_ZOOM_OPTIONS();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "Tweet", {
      enumerable: true,
      get: function get() {
        return _tweet.default;
      }
    });
    Object.defineProperty(exports, "Moment", {
      enumerable: true,
      get: function get() {
        return _moment.default;
      }
    });
    Object.defineProperty(exports, "Timeline", {
      enumerable: true,
      get: function get() {
        return _timeline.default;
      }
    });
    var _tweet = _interopRequireDefault(require_tweet());
    var _moment = _interopRequireDefault(require_moment());
    var _timeline = _interopRequireDefault(require_timeline());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// dep:vue-tweet-embed
init_define_EXTERNAL_LINK_ICON_LOCALES();
init_define_MZ_ZOOM_OPTIONS();
var vue_tweet_embed_default = require_dist();
export {
  vue_tweet_embed_default as default
};
//# sourceMappingURL=vue-tweet-embed.js.map

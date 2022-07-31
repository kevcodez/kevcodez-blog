<template><div><h2 id="eclipse-no-repository-found" tabindex="-1"><a class="header-anchor" href="#eclipse-no-repository-found" aria-hidden="true">#</a> Eclipse No repository found</h2>
<p>Wer öfters mal Plugins installiert oder aktualisiert in Eclipse oder in einer Subversion von Eclipse, wie Spring Tools Suite, kennt vielleicht das Problem, was in etwa so aussieht...</p>
<blockquote>
<p>An error occurred while collecting items to be installed session context was:(profile=epp.package.jee, phase=org.eclipse.equinox.internal.p2.engine.phases.Collect, operand=, action=). No repository found containing: osgi.bundle,org.eclipse.emf,2.6.0.v20120917-0436
No repository found containing: osgi.bundle,org.eclipse.emf.ant,2.7.0.v20120917-0436 No repository found containing: osgi.bundle,org.eclipse.emf.codegen,2.8.0.v20120917-0436
No repository found containing: osgi.bundle,org.eclipse.emf.codegen.ecore,2.8.1.v20120917-0436
No repository found containing: osgi.bundle,org.eclipse.emf.codegen.ecore.ui,2.8.0.v20120917-0436 No repository found containing: osgi.bundle,org.eclipse.emf.codegen.ui,2.6.0.v20120917-0436 No repository found containing: osgi.bundle,org.eclipse.emf.common,2.8.0.v20120911-0500 No repository found containing: osgi.bundle,org.eclipse.emf.common.ui,2.7.0.v20120917-0436 No repository found containing: osgi.bundle,org.eclipse.emf.converter,2.5.0.v20120917-0436
No repository found containing: osgi.bundle,org.eclipse.emf.databinding,1.2.0.v20120917-0436
No repository found containing: osgi.bundle,org.eclipse.emf.databinding.edit,1.2.0.v20120917-0436
No repository found containing: osgi.bundle,org.eclipse.emf.ecore,2.8.1.v20120911-0500
No repository found containing: osgi.bundle,org.eclipse.emf.ecore.change,2.8.0.v20120911-0500</p>
</blockquote>
<p>Der Fehler lässt sich jedoch relativ einfach beheben! Geht zunächst in die Eclipse Einstellungen unter <strong>Window</strong> &gt; <strong>Preferences</strong> und sucht nach <strong>software</strong>. Dort sollten ihr den Punkt <strong>Available Software Sites</strong> finden. Klickt euch nun einfach durch die Seiten, die <em>Enabled</em> sind und drückt jeweils auf die Schaltfläche <strong>Reload</strong>. Dadurch werden die Update-Repositories aktualisiert und es sollte wieder ohne Probleme funktionieren. 😉</p>
<p><a href="./eclipse_no_repository_found.png">Eclipse - No repository found - Fix</a></p>
<p>Einfach mit der Schaltfläche <strong>OK</strong> bestätigen und nochmal versuchen.</p>
</div></template>

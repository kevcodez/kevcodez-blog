---
title: "Fix: Eclipse No repository found containing xxx"
date: "2015-07-01"
---

## Eclipse No repository found

Wer öfters mal Plugins installiert oder aktualisiert in Eclipse oder in einer Subversion von Eclipse, wie Spring Tools Suite, kennt vielleicht das Problem, was in etwa so aussieht...

> An error occurred while collecting items to be installed session context was:(profile=epp.package.jee, phase=org.eclipse.equinox.internal.p2.engine.phases.Collect, operand=, action=). No repository found containing: osgi.bundle,org.eclipse.emf,2.6.0.v20120917-0436 
> No repository found containing: osgi.bundle,org.eclipse.emf.ant,2.7.0.v20120917-0436 No repository found containing: osgi.bundle,org.eclipse.emf.codegen,2.8.0.v20120917-0436 
> No repository found containing: osgi.bundle,org.eclipse.emf.codegen.ecore,2.8.1.v20120917-0436 
> No repository found containing: osgi.bundle,org.eclipse.emf.codegen.ecore.ui,2.8.0.v20120917-0436 No repository found containing: osgi.bundle,org.eclipse.emf.codegen.ui,2.6.0.v20120917-0436 No repository found containing: osgi.bundle,org.eclipse.emf.common,2.8.0.v20120911-0500 No repository found containing: osgi.bundle,org.eclipse.emf.common.ui,2.7.0.v20120917-0436 No repository found containing: osgi.bundle,org.eclipse.emf.converter,2.5.0.v20120917-0436
> No repository found containing: osgi.bundle,org.eclipse.emf.databinding,1.2.0.v20120917-0436 
> No repository found containing: osgi.bundle,org.eclipse.emf.databinding.edit,1.2.0.v20120917-0436 
> No repository found containing: osgi.bundle,org.eclipse.emf.ecore,2.8.1.v20120911-0500 
> No repository found containing: osgi.bundle,org.eclipse.emf.ecore.change,2.8.0.v20120911-0500 



Der Fehler lässt sich jedoch relativ einfach beheben! Geht zunächst in die Eclipse Einstellungen unter **Window** > **Preferences** und sucht nach **software**. Dort sollten ihr den Punkt **Available Software Sites** finden. Klickt euch nun einfach durch die Seiten, die _Enabled_ sind und drückt jeweils auf die Schaltfläche **Reload**. Dadurch werden die Update-Repositories aktualisiert und es sollte wieder ohne Probleme funktionieren. ;)

[![Eclipse - No repository found - Fix](http://kevcodez.de/wp-content/uploads/2015/07/eclipse_no_repository_found.png)](http://kevcodez.de/wp-content/uploads/2015/07/eclipse_no_repository_found.png)

Einfach mit der Schaltfläche **OK** bestätigen und nochmal versuchen.

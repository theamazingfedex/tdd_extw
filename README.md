# tdd_extw
<h3>esbump</h3> - SemVer package version updater and git pusher (TDD style) Node.js CLI Application
<b>esbump</b> allows you to specify whether you want to bump the Major, Minor, Patch, or Pre-Release version of an npm package then tags and commits the code as a release on github.
<br/>
<br/>
<h4>Install</h4>
<b>Requirements: 
<ul>
<li>Node.js 10.x+</li>
<li>npm</li></b>
</ul>
To install <b>esbump</b>, simply clone this repository to a location on your hard disk, then navigate via command line to the directory and run:
<pre> npm link </pre>

<h4>Usage</h4>
To use <b>esbump</b> from command line after installation, and to bump the patch version oncce, from the directory of an npm package simply execute:
<pre> esbump </pre>
<h5>Arguments</h5>
<b>esbump</b> allows you to specify:
<ul>
<li>bumping the Major version once by executing
<pre> esbump -M </pre></li>
<li>bumping the Minor version once by executing
<pre> esbump -m </pre></li>
<li>bumping the patch version once by executing
<pre> esbump -p </pre></li>
<li>bumping the version to a pre-release by executing
<pre> esbump --prerelease <alpha|beta|foo|bar></pre>

<br/><br/>
<h2>License</h2>
<b>MIT</b>

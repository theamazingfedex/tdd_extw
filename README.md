# tdd_extw
<h3>semverbump</h3> - SemVer package version updater and git pusher Node.js CLI Application
<b>semverbump</b> allows you to specify whether you want to bump the Major, Minor, Patch, or Pre-Release version of an npm package then tags and commits the code as a release on github.
<br/>
<br/>
<h4>Install</h4>
<b>Requirements: 
<ul>
<li>Node.js 10.x+</li>
<li>npm</li></b>
</ul>
To install <b>semverbump</b>, simply run:
<pre> npm install semverbump </pre>

<h4>Usage</h4>
To use <b>semverbump</b> from command line after installation, and to bump the patch version oncce, from the directory of an npm package simply execute:
<pre> semverbump </pre>
<h5>Arguments</h5>
<b>semverbump</b> allows you to specify:
<ul>
<li>bumping the Major version once by executing
<pre> semverbump <-M | --major> </pre></li>
<li>bumping the Minor version once by executing
<pre> semverbump <-m | --minor> </pre></li>
<li>bumping the patch version once by executing
<pre> semverbump <-p | --patch> </pre></li>
<li>bumping the version to a pre-release by executing
<pre> semverbump <-P | --prerelease> <alpha|beta|...></pre>

<br/><br/>
<h2>License</h2>
<b>MIT</b>

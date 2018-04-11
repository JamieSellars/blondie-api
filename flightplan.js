// flightplan.js
var plan = require('flightplan');

/**
 * Remote configuration for "production"
 */
plan.target('production', {
  env: 'production',
  host: 'pbnode',
  username: '',
  password: '',
  agent: process.env.SSH_AUTH_SOCK,

  webRoot: '/var/www/blondie/webapi',
  ownerUser: 'webdeploy',
  repository: 'https://github.com/goingsideways/blondie-api.git',
  branchName: 'master',
  maxDeploys: 10
});

/**
 * Creates all the necessary folders in the remote and clones the source git repository
 *
 * Usage:
 * > fly setup[:remote]
 */
plan.remote('setup', function(remote) {
	remote.hostname();


  remote.log("-----------------------------------------------------   ");
  remote.log("/!\\ Preparing up Blondie Backend API /!\\")
  remote.log("-----------------------------------------------------   ");
  remote.log("SERVER:     " + remote.runtime.host);
  remote.log("BRANCH:     " + remote.runtime.branchName);
  remote.log("ENVIRONMENT " + remote.runtime.env)
  remote.log("-----------------------------------------------------   ");
	remote.sudo('mkdir -p ' + remote.runtime.webRoot);
	remote.with('cd ' + remote.runtime.webRoot, function() {
		remote.sudo('mkdir versions');
		remote.sudo('git clone -b ' + remote.runtime.branchName + ' ' + remote.runtime.repository + ' repo');
	});

  remote.log("-----------------------------------------------------   ");
  remote.log("You can now execute fly deploy:production");
  remote.log("-----------------------------------------------------   ");
});

/**
 * Deploys a new version of the code pulling it from the git repository
 *
 * Usage:
 * > fly deploy[:remote]
 */
plan.remote('deploy', function(remote) {
	remote.hostname();

	remote.with('cd ' + remote.runtime.webRoot, function() {

    remote.log("-----------------------------------------------------   ");
    remote.log("/!\\ Deploying Blondie Backend API /!\\")
    remote.log("-----------------------------------------------------   ");
    remote.log("SERVER:     " + remote.runtime.host);
    remote.log("BRANCH:     " + remote.runtime.branchName);
    remote.log("ENVIRONMENT " + remote.runtime.env)
    remote.log("-----------------------------------------------------   ");





		remote.sudo('cd repo && git pull');
		var command = remote.exec('date +%s.%N');
		var versionId = command.stdout.trim();
		var versionFolder = 'versions/' + versionId

		remote.sudo('cp -R repo ' + versionFolder);
		remote.sudo('chown -R ' + remote.runtime.ownerUser + ':' + remote.runtime.ownerUser + ' ' + versionFolder);
		remote.sudo('ln -fsn ' + versionFolder + ' public_api');
		remote.sudo('chown -R ' + remote.runtime.ownerUser + ':' + remote.runtime.ownerUser + ' public_api');



    // remove files with sentive data.
    remote.sudo('rm -rf ' + versionFolder + '/flightplan.js');
    remote.sudo('rm -rf ' + versionFolder + '/README.md');

  	if (remote.runtime.maxDeploys > 0) {
      remote.log('--------------------------');
			remote.log('Cleaning up old deploys...');
      remote.log('--------------------------');
			remote.sudo('rm -rf `ls -1dt versions/* | tail -n +' + (remote.runtime.maxDeploys+1) + '`');
		}

    // remote.log('--------------------------------');
    // remote.log('Install Application Dependencies');
    // remote.log('--------------------------------');
    //
    // remote.sudo('npm install sails');
    remote.log('Install Application Dependencies');
    remote.sudo('npm --production --prefix ' + versionFolder + ' install ' + versionFolder + ' --slient');

  });

  remote.with('cd ' + remote.runtime.webRoot + '/public_api', function() {


    remote.log('-----------------------------------');
    remote.log('Reload Application with new runtime');
    remote.log('-----------------------------------');

    // Start pm2 process with new version
    remote.sudo('pm2 start app.json -i 0 -f');

		remote.log('Successfully deployed');
		remote.log('To rollback to the previous version run "fly rollback:development"');
	});
});

/**
 * Rollbacks to the previous deployed version (if any)
 *
 * Usage
 * > fly rollback[:remote]
 */
plan.remote('rollback', function(remote) {
	remote.hostname();

	remote.with('cd ' + remote.runtime.webRoot, function() {
		var command = remote.exec('ls -1dt versions/* | head -n 2');
		var versions = command.stdout.trim().split('\n');

		if (versions.length < 2) {
			return remote.log('No version to rollback to');
		}

		var lastVersion = versions[0];
		var previousVersion = versions[1];

		remote.log('Rolling back from ' + lastVersion + ' to ' + previousVersion);

		remote.sudo('ln -fsn ' + previousVersion + ' current');
		remote.sudo('chown -R ' + remote.runtime.ownerUser + ':' + remote.runtime.ownerUser + ' current');

		remote.sudo('rm -rf ' + lastVersion);
	});
});

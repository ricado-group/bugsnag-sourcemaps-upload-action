import * as bugsnag from '@bugsnag/source-maps';
import * as core from '@actions/core';

interface BugsnagUploadOpts {
    apiKey: string;
    baseUrl: string;
    directory: string;
    appVersion: string;
    overwrite?: boolean;
    endpoint?: string;
}

async function run(): Promise<void>
{
	try
	{
		const directory = core.getInput('directory');

		if(directory.length === 0)
		{
			core.setFailed(`The 'directory' Input is Required`);
			return;
		}

		const baseUrl = core.getInput('base-url');

		if(baseUrl.length === 0)
		{
			core.setFailed(`The 'base-url' Input is Required`);
			return;
		}

		const apiKey = core.getInput('api-key');

		if(apiKey.length === 0)
		{
			core.setFailed(`The 'api-key' Input is Required`);
			return;
		}

		const appVersion = core.getInput('app-version');

		if(appVersion.length === 0)
		{
			core.setFailed(`The 'app-version' Input is Required`);
			return;
		}

		const opts: BugsnagUploadOpts = {
			apiKey,
			baseUrl,
			directory,
			appVersion,
		};

		if(core.getInput('overwrite').length > 0)
		{
			opts.overwrite = core.getBooleanInput('overwrite');
		}

		if(core.getInput('endpoint').length > 0)
		{
			opts.endpoint = core.getInput('endpoint');
		}

		await bugsnag.browser.uploadMultiple(opts);
	}
	catch (error)
	{
		if(error instanceof Error)
		{
			core.setFailed(error);
		}
		else if(typeof error === 'string')
		{
			core.setFailed(error);
		}
		else
		{
			core.setFailed("Unknown or Invalid Error Caught");
		}
	}
}
import * as bugsnag from '@bugsnag/source-maps';
import * as core from '@actions/core';
import { LogLevel } from 'consola';

interface BugsnagUploadOpts {
    apiKey: string;
    baseUrl: string;
    directory: string;
    appVersion: string;
    overwrite?: boolean;
    endpoint?: string;
	logger?: Logger;
}

type Logger = {
    trace: (...args: unknown[]) => void;
    debug: (...args: unknown[]) => void;
    info: (...args: unknown[]) => void;
    success: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    fatal: (...args: unknown[]) => void;
    level: LogLevel;
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

		const baseUrl = core.getInput('baseUrl');

		if(baseUrl.length === 0)
		{
			core.setFailed(`The 'baseUrl' Input is Required`);
			return;
		}

		const apiKey = core.getInput('apiKey');

		if(apiKey.length === 0)
		{
			core.setFailed(`The 'apiKey' Input is Required`);
			return;
		}

		const appVersion = core.getInput('appVersion');

		if(appVersion.length === 0)
		{
			core.setFailed(`The 'appVersion' Input is Required`);
			return;
		}

		const opts: BugsnagUploadOpts = {
			apiKey,
			baseUrl,
			directory,
			appVersion,
			logger: {
				debug: (...args: unknown[]) => {
					if(args.length > 0 && typeof args[0] === 'string')
					{
						core.debug(args[0]);
					}
				},
				error: (...args: unknown[]) => {
					if(args.length > 0 && typeof args[0] === 'string')
					{
						core.error(args[0]);
					}
					else if(args.length > 0 && typeof args[0] === 'object' && args[0] instanceof Error)
					{
						core.error(args[0]);
					}
				},
				info: (...args: unknown[]) => {
					if(args.length > 0 && typeof args[0] === 'string')
					{
						core.info(args[0]);
					}
				},
				success: (...args: unknown[]) => {
					if(args.length > 0 && typeof args[0] === 'string')
					{
						core.info(args[0]);
					}
				},
				warn: (...args: unknown[]) => {
					if(args.length > 0 && typeof args[0] === 'string')
					{
						core.warning(args[0]);
					}
					else if(args.length > 0 && typeof args[0] === 'object' && args[0] instanceof Error)
					{
						core.warning(args[0]);
					}
				},
				fatal: () => {},
				trace: () => {},
				level: LogLevel.Debug,
			}
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

run();
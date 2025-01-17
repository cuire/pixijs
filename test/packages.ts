import fs from 'fs';
import path from 'path';
import workspacesRun from '@pixi/workspaces-run';

interface PackageResult
{
    name: string;
    location: string;
    tests: string;
    available: boolean;
}

async function main()
{
    const packages: PackageResult[] = [];
    const cwd = path.dirname(__dirname);

    await workspacesRun({ cwd, orderByDeps: true }, async ({ name, dir: location }) =>
    {
        const tests = path.join(location, 'test');
        const available = fs.existsSync(tests);

        packages.push({ name, location, tests, available });
    });

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(packages, null, '  '));
}

main();

export type { PackageResult };

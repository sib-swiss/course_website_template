# Course website template

**Find instructions at [sib-swiss.github.io/gh-pages-training/](https://sib-swiss.github.io/gh-pages-training/).**

This website is generated with [Zensical](https://zensical.org).

Default deployment is versioned deployment with [mike](https://github.com/squidfunk/mike) (for Zensical).

## Local development

Install Zensical and mike:

```bash
pip install zensical
pip install git+https://github.com/squidfunk/mike.git
```

Use this repository as a template, clone it locally, and run:

```bash
zensical serve
```

Then open [http://localhost:8000/](http://localhost:8000/).

## Deployment (default: mike)

Set the site URL in [zensical.toml](zensical.toml) to your GitHub Pages URL:

- https://yourname.github.io/reponame/

Deploy the first version and set latest as default:

```bash
mike deploy --push --update-aliases 0.1 latest
mike set-default --push latest
```

For the next releases, deploy a new version and update latest:

```bash
mike deploy --push --update-aliases 0.2 latest
```

Your documentation will be available at:

- https://yourname.github.io/reponame/
- https://yourname.github.io/reponame/0.1/
- https://yourname.github.io/reponame/0.2/

## Zenodo archival (optional)

To archive course versions on [Zenodo](https://zenodo.org/) and assign DOIs, configure [.zenodo.json](.zenodo.json) with your metadata:

```json
{
  "title": "Course Name",
  "creators": [{"name": "Your Name", "affiliation": "Your Institution"}],
  "description": "...",
  "keywords": ["course", "training"],
  "license": "CC-BY-4.0"
}
```

Then:

1. **Link to Zenodo**: Go to https://zenodo.org/account/settings/github/ and connect your GitHub repository.
2. **Create a release**: On GitHub, go to Releases and click "Create a new release".
   - Set tag to match your version (e.g., `v0.1`).
   - Publish the release.
3. **Zenodo automates the rest**: Zenodo will automatically fetch your repository snapshot and generate a DOI.

Your course will then have a citable DOI at https://doi.org/10.5281/zenodo.XXXXXXX.

## Notes

- mike publishes to the gh-pages branch.
- In GitHub repository settings, configure Pages to serve from the gh-pages branch.
- The workflow in [.github/workflows/render_page.yml](.github/workflows/render_page.yml) still uses MkDocs gh-deploy and should be updated or removed if mike is your deployment method.

More documentation:

- Zensical versioning: https://zensical.org/docs/setup/versioning/
- Zensical docs: https://zensical.org/docs/
- mike docs: https://github.com/squidfunk/mike

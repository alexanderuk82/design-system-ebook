# Changesets

Official folder for [changesets](https://github.com/changesets/changesets)
where every PR drops a small markdown file describing the change it
introduces.

To add a new changeset from the root of this example:

```bash
npm run changeset
```

The CLI asks which packages change, what kind of bump each one gets
(major/minor/patch), and a summary of the change. It writes a file in this
folder with a random name.

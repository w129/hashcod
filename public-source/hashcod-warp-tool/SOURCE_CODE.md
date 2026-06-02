# Corresponding source

The corresponding source for the Hashcod Warp Workspace browser adapter is in
this package under `app/`.

The full native Warp desktop project is not copied into this package because it
is a separate upstream application and the supplied source ZIP exceeds GitHub's
ordinary single-file size limit. Obtain the native upstream source with:

```powershell
./scripts/fetch-upstream.ps1
```

Upstream repository: https://github.com/warpdotdev/Warp

If Hashcod later distributes a modified native Warp build, the corresponding
modified native source must be published separately with its applicable
licenses and notices.

<h1>Check the Exec</h1>

Check the Exec is a Nativescript app that shows the latest executive actions (orders, memos, etc.), and lets users share their thoughts on those actions with their representatives in Congress.

The app is currently available for [Android on the Google Play Store](https://play.google.com/store/apps/details?id=com.mntour.checktheexec).

<h2>About the data</h2>
- [Federal Register](https://www.federalregister.gov/), provider of the president's executive action data
- [ProPublica](https://www.propublica.org/) and (formerly) Sunlight Labs, publishers of the congressional representative data

<h2>Development</h2>

This app is built with the NativeScript CLI. Once you have the [CLI installed](https://docs.nativescript.org/start/quick-setup), start by cloning the repo:

```
$ git clone https://github.com/jasonlcrane/check-the-exec.git
$ cd check-the-exec
```

From there you can use the `run` command to run the app on Android:

```
$ tns run android
```

And the same command to run it on iOS:

```
$ tns run ios
```
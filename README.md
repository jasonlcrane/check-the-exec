<h1>Check the Exec</h1>

Check the Exec is a Nativescript app that shows the latest executive actions (orders, memos, etc.), and lets users share their thoughts on those actions with their representatives in Congress.

The app is currently available for [Android on the Google Play Store](https://play.google.com/store/apps/details?id=com.mntour.checktheexec).

<h2>About the data</h2>

* [Federal Register](https://www.federalregister.gov/), 
* [ProPublica](https://www.propublica.org/) and (formerly) Sunlight Labs, publishers of the congressional representative data

<h2>Development</h2>

This app was originally developed in March of 2017 when NativeScript was at version 2.5, Angular was at 2.4, and I was stumbling my way through learning how to do this. At this point, it's in need of quite a bit of help, so I'm hoping that by open-sourcing it you may decide it's a worthy cause and chip in. First things first, everything needs to be upgraded, and the congressional representative data needs to be moved to a different API, since the one in use by the app is no longer around. Google's [Civic Information API](https://developers.google.com/civic-information/) is probably a good place to start.

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

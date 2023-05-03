# media

## install

```sh
media % pnpm i
```

## dev

```sh
media % pnpm dev
media % pnpm dev:web
```

```sh
media % curl http://localhost:3000 # <!DOCTYPE html>
```

## native

```sh
native % brew install ios-deploy
native % pnpm dev:ios
native % pnpm ios
native % pnpm react-native build-ios --mode=Release --device
ios % xcodebuild -list
ios % ios-deploy -b /Users/Dev/Library/Developer/Xcode/DerivedData/Media-xyz/Build/Products/Release-iphoneos/Media.app
```

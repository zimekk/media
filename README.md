# media

## install

```sh
media % pnpm i
```

## cleanup

```sh
 media % pnpm store prune
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
ios % ios-deploy -c
ios % ios-deploy -b /Users/Dev/Library/Developer/Xcode/DerivedData/Media-xyz/Build/Products/Release-iphoneos/Media.app
```

## docker

```sh
media % echo "PORT=8080" >> .env
media % cat .env
PORT=8080
media % docker-compose up --build
```

```sh
git fetch && git reset --hard origin
docker-compose -f docker-compose.yml up --build -d && docker system prune -f
```

```sh
docker-compose logs -f --tail=25 app
docker-compose exec app sh
```

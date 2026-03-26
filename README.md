# 🎉 @shadahmad7/react-native-confetti

A lightweight, customizable, and performant **confetti animation library for React Native (CLI)** powered by **Reanimated**.

Perfect for celebrations, success states, rewards, onboarding, and delightful UI moments.

---

## ✨ Features

- 🚀 Smooth animations using `react-native-reanimated`
- 🎨 Fully customizable (colors, size, spread, intensity)
- 🔁 Looping & manual trigger support
- 🧠 Imperative API (`trigger()` via ref)
- 📱 Works with React Native CLI
- ⚡ Lightweight & easy to integrate

---

## 📦 Installation

```bash
npm install @shadahmad7/react-native-confetti
```

---

## ⚠️ Peer Dependencies (Required)

You MUST install these in your project:

```bash
npm install react-native-reanimated react-native-svg react-native-worklets
```

### Supported Versions

- `react-native-reanimated` ≥ **4.x**
- `react-native-svg` ≥ **15.x**
- `react-native-worklets` ≥ **0.6.x**

---

## ⚙️ Setup

### 1. Reanimated Setup

Follow official setup:

👉 Add this to your `babel.config.js`

```js
module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: ["react-native-reanimated/plugin"],
};
```

---

### 2. iOS Setup

```bash
cd ios && pod install
```

---

### 3. Rebuild App (IMPORTANT)

```bash
npx react-native run-android
# or
npx react-native run-ios
```

---

## 🚀 Usage

```tsx
import React, { useRef } from "react";
import { SafeAreaView, Button, Alert } from "react-native";
import { Confetti, ConfettiHandle } from "@shadahmad7/react-native-confetti";

export default function App() {
  const confettiRef = useRef<ConfettiHandle>(null);

  const triggerConfetti = () => {
    confettiRef.current?.trigger();
  };

  const handleComplete = () => {
    Alert.alert("Confetti completed!");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Button title="Show Confetti" onPress={triggerConfetti} />

      <Confetti
        ref={confettiRef}
        count={50}
        colors={["#ff0000", "#00ff00", "#0000ff", "#ffff00"]}
        intensity={1.5}
        spread={25}
        minSize={4}
        maxSize={16}
        opacityRange={[40, 90]}
        autoPlay={false}
        loop={false}
        onComplete={handleComplete}
      />
    </SafeAreaView>
  );
}
```

---

## 🎛 Props

| Prop           | Type               | Default                                        | Description                 |
| -------------- | ------------------ | ---------------------------------------------- | --------------------------- |
| `count`        | `number`           | `200`                                          | Number of confetti pieces   |
| `colors`       | `string[]`         | `["#1b70de", "#32af4b", "#ff0000", "#ffff00"]` | Colors array                |
| `intensity`    | `number`           | `1`                                            | Speed & distance multiplier |
| `spread`       | `number`           | `15`                                           | Angle spread (degrees)      |
| `minSize`      | `number`           | `6`                                            | Minimum size                |
| `maxSize`      | `number`           | `12`                                           | Maximum size                |
| `fallDuration` | `number`           | `5500`                                         | Falling duration (ms)       |
| `upDuration`   | `[number, number]` | `[1000, 1600]`                                 | Upward duration range       |
| `opacityRange` | `[number, number]` | `[25, 90]`                                     | Opacity range (%)           |
| `autoPlay`     | `boolean`          | `true`                                         | Auto start animation        |
| `loop`         | `boolean`          | `false`                                        | Repeat animation            |
| `onComplete`   | `() => void`       | —                                              | Called after animation ends |
| `style`        | `ViewStyle`        | —                                              | Container styling           |

---

## 🎬 Demo

![Confetti Demo](./assets/demo.gif)

## 🎮 Imperative API

```ts
export interface ConfettiHandle {
  trigger: () => void;
}
```

### Example

```ts
confettiRef.current?.trigger();
```

---

## ⚠️ Troubleshooting

### ❌ Confetti not visible?

- Ensure `react-native-svg` is installed
- Add `zIndex`:

```tsx
<Confetti style={{ zIndex: 999 }} />
```

---

### ❌ Animation not running?

- Check Reanimated setup
- Ensure Babel plugin is added
- Rebuild app (not hot reload)

---

## 🛠 Roadmap

- [ ] Preset animations (burst, rain, explosion)
- [ ] Performance mode (no SVG)
- [ ] Custom shapes API
- [ ] Web support

---

## 🤝 Contributing

PRs welcome! Open issues for bugs or feature requests.

---

## 📄 License

MIT © Shad Ahmad

---

## ⭐ Support

If you like this package, give it a ⭐ on GitHub!

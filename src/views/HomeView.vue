<template>
  <main>
    <div
      class="p-4 flex flex-col mx-auto bg-neutral bg-opacity-10 w-64 text-center rounded-md border"
    >
      <p>X{{ x.toFixed(0) }}</p>
      <p>Y{{ y.toFixed(0) }}</p>
    </div>
  </main>
</template>

<script setup>
import { useLocalStorage, useMouse, usePreferredDark } from "@vueuse/core";

const { x, y } = useMouse();

// persist state in localStorage
const store = useLocalStorage("my-storage", {
  name: "Apple",
  color: "red",
});
</script>

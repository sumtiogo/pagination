<template>
  <article v-for="(d, i) in data" :key="i">
    <h1>Post # {{ i }}</h1>
    <span>Author: {{ d.author }}</span>
    <p>{{ d.content }}</p>
  </article>
  <div v-if="isLoading">Loading data...</div>
</template>

<script lang="ts" setup>
import { fetchData, Post } from "@/server";
import { onMounted, ref } from "vue";
const data = ref<Post[]>([]);
const isLoading = ref<boolean>(false);
onMounted(async () => {
  isLoading.value = true;
  data.value = await fetchData();
  isLoading.value = false;
});

async function loadMore() {
  isLoading.value = true;
  const posts = await fetchData();
  data.value.push(...posts);
  isLoading.value = false;
}

function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: number;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
function monitorReachBottom() {
  console.log("so busy");
  if (
    window.innerHeight + Math.ceil(window.pageYOffset) >=
    document.body.offsetHeight
  ) {
    loadMore();
  }
}
onMounted(() => {
  document.addEventListener("scroll", debounce(monitorReachBottom, 200));
});
</script>

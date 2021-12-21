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
window.addEventListener("scroll", () => {
  console.log("scrolling");
});

async function loadMore() {
  isLoading.value = true;
  const posts = await fetchData();
  data.value.push(...posts);
  isLoading.value = false;
}

onMounted(() => {
  document.addEventListener("scroll", () => {
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.offsetHeight
    ) {
      loadMore();
    }
  });
});
</script>

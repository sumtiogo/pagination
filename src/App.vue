<template>
  <div>
    {{ data }}
  </div>
  <div v-if="isLoading">Loading data...</div>
</template>

<script lang="ts" setup>
import { fetchData } from "@/server";
import { onMounted, ref } from "vue";
const data = ref<number>(0);
const isLoading = ref<boolean>(false);
onMounted(async () => {
  isLoading.value = true;
  data.value = await fetchData();
  isLoading.value = false;
});
</script>

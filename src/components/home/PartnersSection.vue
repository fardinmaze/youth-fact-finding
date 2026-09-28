<script setup>
import { useLang } from '@/stores/lang'
import { PARTNERS } from '@/data/partners'

const { t } = useLang()
</script>

<template>
  <section class="bg-white px-[var(--page-gutter)] py-12">
    <div class="flex flex-col items-center gap-8">
      <h2 class="font-heading text-2xl font-bold tracking-tight text-accent-900 sm:text-3xl">
        {{ t.partners.title }}
      </h2>
      <ul class="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
        <li v-for="p in PARTNERS" :key="p.id" class="flex items-center">
          <img :src="p.logo" :alt="p.name" class="w-auto object-contain" :class="p.height" loading="lazy" />
        </li>
      </ul>
    </div>
  </section>
</template>

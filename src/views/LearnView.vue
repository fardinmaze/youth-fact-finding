<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import arrowUpRight from '@/assets/icons/arrow-up-right.svg?raw'
import { useLang } from '@/stores/lang'
import { MODULES, POCKET_BOOKS, getBookCover } from '@/data/learningModules'

const { t, isBn } = useLang()
const route = useRoute()
const router = useRouter()

// The active tab lives in the URL (?tab=pocket-books) so it can be linked to directly and survives a refresh / back button.
const TABS = ['modules', 'pocket-books']
const tab = computed(() => (route.query.tab === 'pocket-books' ? 'pocket-books' : 'modules'))
const tabs = computed(() => [
  { id: 'modules', label: t.value.learnPage.tabs.modules, count: MODULES.length },
  { id: 'pocket-books', label: t.value.learnPage.tabs.pocketBooks, count: POCKET_BOOKS.length },
])

function selectTab(id) {
  router.replace({ query: id === 'modules' ? {} : { tab: id }, hash: '' })
}

// Left / right arrow keys move between tabs (standard tablist behaviour)
function onKey(e) {
  const i = TABS.indexOf(tab.value)
  const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null
  if (next === null) return
  e.preventDefault()
  const id = TABS[(next + TABS.length) % TABS.length]
  selectTab(id)
  document.getElementById(`learn-tab-${id}`)?.focus()
}
</script>

<template>
  <main class="flex flex-col gap-8 px-[var(--page-gutter)] py-14">
    <div class="flex flex-col items-start gap-1.5">
      <p class="bg-accent-900 px-3 py-2 font-heading text-base text-accent-50">{{ t.learnPage.eyebrow }}</p>
      <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-brand-500 lg:text-[48px]">
        {{ t.learnPage.headline }}
      </p>
      <p class="max-w-3xl font-heading text-xl text-accent-700 sm:text-2xl">
        {{ t.learnPage.subtitle }}
      </p>
    </div>

    <!-- Tabs: one click to the pocket books, no scrolling past the modules to find them -->
    <div role="tablist" :aria-label="t.learnPage.eyebrow" class="flex gap-2 border-b border-accent-100" @keydown="onKey">
      <button
        v-for="item in tabs"
        :id="`learn-tab-${item.id}`"
        :key="item.id"
        type="button"
        role="tab"
        :aria-selected="tab === item.id"
        :aria-controls="`learn-panel-${item.id}`"
        :tabindex="tab === item.id ? 0 : -1"
        class="-mb-px flex items-center gap-2 border-b-[3px] px-4 py-3 font-heading text-sm font-semibold transition-colors sm:px-6 sm:text-base"
        :class="
          tab === item.id
            ? 'border-brand-500 text-brand-500'
            : 'border-transparent text-accent-600 hover:text-accent-900'
        "
        @click="selectTab(item.id)"
      >
        {{ item.label }}
        <span
          class="rounded-full px-2 py-0.5 text-xs"
          :class="tab === item.id ? 'bg-brand-500 text-white' : 'bg-accent-50 text-accent-600'"
        >
          {{ item.count }}
        </span>
      </button>
    </div>

    <!-- Modules -->
    <div
      v-if="tab === 'modules'"
      id="learn-panel-modules"
      role="tabpanel"
      aria-labelledby="learn-tab-modules"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="mod in MODULES"
        :key="mod.slug"
        class="flex flex-col justify-between gap-8 border border-accent-100 bg-[#f9fafa] px-3 py-6"
      >
        <div class="flex flex-col gap-1.5">
          <p class="font-heading text-sm font-medium text-brand-500">Module {{ mod.number }}</p>
          <p class="font-heading text-2xl font-medium tracking-tight text-accent-600 sm:text-[32px]">
            {{ isBn ? mod.title.bn : mod.title.en }}
          </p>
          <p class="font-heading text-base text-brand-400">{{ isBn ? mod.subtitle.bn : mod.subtitle.en }}</p>
        </div>
        <RouterLink
          :to="{ name: 'learn-detail', params: { slug: mod.slug } }"
          class="flex w-fit items-center gap-3 rounded-button border border-brand-500 px-6 py-3 font-heading text-xs font-medium text-brand-500"
        >
          {{ t.learningMaterials.learnMore }}
          <span class="h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowUpRight" />
        </RouterLink>
      </div>
    </div>

    <!-- Digital Literacy Pocket Books: a dark, book-style card so it reads as different from the module cards.
         The Bangla or English file follows the site language. -->
    <section
      v-else
      id="learn-panel-pocket-books"
      role="tabpanel"
      aria-labelledby="learn-tab-pocket-books"
      class="flex flex-col gap-6"
    >
      <div class="flex flex-col gap-1.5">
        <p class="font-heading text-2xl font-bold tracking-tight text-accent-900 sm:text-3xl">
          {{ t.pocketBooks.heading }}
        </p>
        <p class="max-w-3xl font-heading text-base text-accent-700 sm:text-lg">{{ t.pocketBooks.subtitle }}</p>
      </div>

      <div
        v-for="book in POCKET_BOOKS"
        :key="book.slug"
        class="flex flex-col items-center gap-8 overflow-hidden rounded-lg bg-accent-900 p-6 sm:p-10 md:flex-row md:gap-12"
      >
        <!-- The real cover (page 1 of the PDF), Bangla or English to match the site language -->
        <img
          :src="getBookCover(book, isBn)"
          :alt="isBn ? book.title.bn : book.title.en"
          width="720"
          height="943"
          class="w-44 shrink-0 rounded-sm bg-white shadow-[0_24px_40px_-12px_rgba(0,0,0,0.7)] sm:w-56"
        />

        <div class="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
          <p class="rounded-full bg-brand-500 px-3 py-1 font-heading text-xs font-semibold uppercase tracking-wider text-white">
            {{ t.pocketBooks.label }}
          </p>
          <p class="font-heading text-3xl font-bold leading-snug tracking-tight text-white sm:text-4xl">
            {{ isBn ? book.title.bn : book.title.en }}
          </p>
          <p class="max-w-xl font-heading text-base text-accent-100 sm:text-lg">
            {{ isBn ? book.subtitle.bn : book.subtitle.en }}
          </p>
          <RouterLink
            :to="{ name: 'learn-detail', params: { slug: book.slug } }"
            class="flex w-fit items-center gap-3 rounded-button bg-white px-6 py-3 font-heading text-sm font-semibold text-accent-900 transition-colors hover:bg-brand-50"
          >
            {{ t.pocketBooks.open }}
            <span class="h-4 w-4 [&>svg]:h-full [&>svg]:w-full" v-html="arrowUpRight" />
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

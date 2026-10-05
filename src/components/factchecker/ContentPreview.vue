<script setup>
import { computed, ref, watch } from 'vue'
import { useLang } from '@/stores/lang'
import { parseUrl, fetchLinkThumbnail } from '@/composables/useLinkPreview'

const { t } = useLang()

const props = defineProps({
  contentType: { type: String, default: null },
  contentUrl: { type: String, default: null },
  contentImageUrl: { type: String, default: null },
})

const contentTypeLabel = computed(() => {
  const opt = t.value.factChecker.start.options.find((o) => o.value === props.contentType)
  return opt ? opt.label : ''
})

const linkPreview = computed(() => parseUrl(props.contentUrl))
const linkThumbnailUrl = ref(null)

watch(
  linkPreview,
  async (preview) => {
    linkThumbnailUrl.value = null
    if (!preview) return
    const href = preview.href
    const thumb = await fetchLinkThumbnail(href)
    if (linkPreview.value?.href === href) linkThumbnailUrl.value = thumb
  },
  { immediate: true },
)

const hasAttachment = computed(() => !!props.contentImageUrl || !!linkPreview.value)
</script>

<template>
  <aside class="flex flex-col gap-3">
    <div class="flex flex-wrap items-center gap-2">
      <p class="font-heading text-sm font-semibold text-accent-900">{{ t.factChecker.preview.label }}</p>
      <span v-if="contentTypeLabel" class="rounded-full bg-accent-900 px-3 py-0.5 font-heading text-xs text-accent-50">
        {{ contentTypeLabel }}
      </span>
    </div>

    <div class="flex flex-col overflow-hidden rounded-lg border border-accent-100 bg-[#f5f5f6]">
      <div v-if="contentImageUrl" class="flex max-h-[40vh] items-center justify-center lg:max-h-[60vh]">
        <img :src="contentImageUrl" alt="" class="max-h-[40vh] w-full object-contain lg:max-h-[60vh]" />
      </div>

      <div
        v-if="linkPreview"
        class="flex flex-col bg-white"
        :class="contentImageUrl ? 'border-t border-accent-100' : ''"
      >
        <img
          v-if="linkThumbnailUrl && !contentImageUrl"
          :src="linkThumbnailUrl"
          alt=""
          class="max-h-[40vh] w-full object-cover lg:max-h-[50vh]"
        />
        <div class="flex items-center gap-3 px-4 py-3">
          <span class="shrink-0 text-xl leading-none">🔗</span>
          <div class="flex min-w-0 flex-1 flex-col">
            <p class="truncate font-heading text-sm font-medium text-accent-900">{{ linkPreview.hostname }}</p>
            <p class="truncate font-heading text-xs text-accent-600">{{ linkPreview.href }}</p>
          </div>
          <a
            :href="linkPreview.href"
            target="_blank"
            rel="noopener noreferrer"
            class="shrink-0 font-heading text-xs font-semibold text-brand-500"
          >
            {{ t.factChecker.preview.openLink }}
          </a>
        </div>
      </div>

      <div v-if="!hasAttachment" class="flex flex-col items-center justify-center gap-1.5 px-6 py-10 text-center lg:py-16">
        <p class="font-heading text-base font-medium text-accent-700">{{ t.factChecker.preview.noAttachment }}</p>
        <p class="font-heading text-sm text-accent-600">{{ t.factChecker.preview.noAttachmentHint }}</p>
      </div>
    </div>
  </aside>
</template>

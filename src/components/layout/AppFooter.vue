<script setup>
import logoActionAid from '@/assets/logo-actionaid.png'
import { RouterLink } from 'vue-router'
import { useLang } from '@/stores/lang'
import { CONTACT_HREF } from '@/data/contact'
import { PARTNERS } from '@/data/partners'

const { t } = useLang()
</script>

<template>
  <footer class="bg-accent-900 px-6 py-12 text-accent-white sm:px-[72px] sm:py-[60px] xl:px-[var(--page-gutter)]">
    <div class="flex flex-col gap-10">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <img :src="logoActionAid" alt="ActionAid" class="h-6 w-auto shrink-0 object-contain" />
          <div class="flex flex-col gap-1 sm:items-end sm:text-right">
            <p class="w-fit bg-brand-500 px-6 pb-1 pt-1.5 font-heading text-lg text-accent-50">
              {{ t.footer.slogan }}
            </p>
            <p class="max-w-md font-heading text-sm leading-snug text-accent-50">
              {{ t.footer.subtitle }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-5">
          <a
            :href="CONTACT_HREF.facebook"
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
            class="text-accent-white transition-opacity hover:opacity-75"
          >
            <svg viewBox="0 0 20 20" class="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1743 5.08226C12.6397 4.651 13.36 4.698 13.4129 4.70035L16.427 4.69918L16.4928 0.350177L16.038 0.238542C15.7466 0.166875 14.8547 2.38419e-07 12.8888 2.38419e-07C9.38821 2.38419e-07 7.03568 2.45006 7.03568 6.09518V7.07403H3.51042V11.7744H7.03568V20H11.736V11.7744H15.4517L16.098 7.07403H11.736V6.3537C11.736 5.78144 11.8841 5.35253 12.1743 5.08226Z" />
            </svg>
          </a>
        </div>
      </div>

      <div class="grid gap-8 border-t border-accent-700 pt-10 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="col in t.footer.columns" :key="col.title">
          <p class="font-serif text-2xl">{{ col.title }}</p>
          <ul class="mt-4 flex flex-col gap-2 font-nav text-lg">
            <li v-for="link in col.links" :key="typeof link === 'string' ? link : link.label">
              <RouterLink
                v-if="typeof link === 'object' && link.to"
                :to="link.to"
                class="underline-offset-4 hover:underline"
              >
                {{ link.label }}
              </RouterLink>
              <a
                v-else-if="typeof link === 'object'"
                :href="CONTACT_HREF[link.href]"
                v-bind="link.external ? { target: '_blank', rel: 'noopener' } : {}"
                class="underline-offset-4 hover:underline"
              >
                {{ link.label }}
              </a>
              <template v-else>{{ link }}</template>
            </li>
          </ul>
        </div>
      </div>

      <!-- Partner logos sit directly on the dark footer (no tiles) -->
      <div class="flex flex-col gap-6 border-t border-accent-700 pt-10">
        <p class="font-serif text-2xl">{{ t.partners.footerTitle }}</p>
        <ul class="grid gap-6 sm:grid-cols-3">
          <li v-for="p in PARTNERS" :key="p.id" class="flex flex-col gap-3">
            <p class="font-nav text-base text-accent-100">{{ t.partners.roles[p.roleKey] }}</p>
            <div class="flex h-24 items-center">
              <img :src="p.logo" :alt="p.name" class="max-w-full object-contain" :class="p.height" loading="lazy" />
            </div>
          </li>
        </ul>
      </div>

      <div class="flex flex-col items-center gap-2 border-t border-accent-700 pt-10 text-center">
        <p class="font-serif text-2xl">{{ t.footer.contactHeading }}</p>
        <div class="flex flex-col items-center gap-2 font-nav text-lg">
          <p>{{ t.footer.address }}</p>
          <p>
            <a :href="CONTACT_HREF.email" class="underline-offset-4 hover:underline">{{ t.footer.email }}</a>
          </p>
          <div class="flex flex-wrap items-center justify-center gap-6">
            <p>{{ t.footer.phone }}</p>
            <p>
              <a
                :href="CONTACT_HREF.whatsapp"
                target="_blank"
                rel="noopener"
                class="underline-offset-4 hover:underline"
              >
                {{ t.footer.whatsapp }}
              </a>
            </p>
          </div>
        </div>
      </div>

      <p class="border-t border-accent-700 pt-6 text-center font-heading text-base">
        {{ t.footer.copyright }}
      </p>
    </div>
  </footer>
</template>

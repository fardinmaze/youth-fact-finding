import { reactive, computed, watchEffect } from 'vue'
import { bn, en } from '@/i18n/content'

// Remembered per browser so a page opened in a new tab (e.g. the full-screen PDF reader) keeps the chosen language.
const KEY = 'catch-lang'
function savedLang() {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'en' || v === 'bn' ? v : 'bn'
  } catch {
    return 'bn'
  }
}

const state = reactive({ lang: savedLang() })

watchEffect(() => {
  document.documentElement.setAttribute('lang', state.lang)
  try {
    localStorage.setItem(KEY, state.lang)
  } catch {}
})

export function useLang() {
  const isBn = computed(() => state.lang === 'bn')
  const t = computed(() => (isBn.value ? bn : en))

  function setLang(lang) {
    state.lang = lang
  }

  function toggle() {
    state.lang = state.lang === 'bn' ? 'en' : 'bn'
  }

  return { state, isBn, t, setLang, toggle }
}

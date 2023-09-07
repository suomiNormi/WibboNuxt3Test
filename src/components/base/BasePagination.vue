<template>
  <span class="flex flex-row pagination">
    <a class="pagination__link" @click.prevent="goFirst">«</a>
    <a class="pagination__link" @click.prevent="goTo(pageId - 1)">‹</a>
    <div v-show="pageId > 4" class="pagination__link">…</div>

    <a v-show="pageId - 1 > 0" class="pagination__link" @click.prevent="goTo(pageId - 1)">{{ pageId - 1 }}</a>
    <a class="pagination__link pagination__active" @click.prevent="goTo(pageId)">{{ pageId }}</a>
    <a v-show="pageId + 1 <= numberOfPages" class="pagination__link" @click.prevent="goTo(pageId + 1)">{{ pageId + 1 }}</a>

    <div v-show="pageId <= numberOfPages - 4" class="pagination__link">…</div>
    <a class="pagination__link" @click.prevent="goTo(pageId + 1)">›</a>
    <a class="pagination__link" @click.prevent="goLast">»</a>
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  numberOfPages: { type: Number, require: true, default: 1 }
})

const route = useRoute()

const goTo = (id: number) => {
  if (id === pageId.value) { return }

  if (id > props.numberOfPages) { return }

  if (id < 0) { return }

  if (id <= 1) { navigateTo({ query: { page: '1' } }) } else { navigateTo({ query: { page: id.toString() } }) }
}

const goFirst = () => {
  if (pageId.value <= 1) { return }

  navigateTo({ query: { page: '1' } })
}

const goLast = () => {
  if (pageId.value === props.numberOfPages) { return }

  navigateTo({ query: { page: props.numberOfPages.toString() } })
}

const pageId = computed(() => {
  const page = route.query.page ? parseInt(route.query.page.toString()) : 1

  return page > props.numberOfPages ? props.numberOfPages : page < 1 ? 1 : page
})
</script>

<style lang="scss">
.pagination {
    &__link {
        display: block;
        background-color: var(--primary-color);
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        margin: 0 2px;
        padding: 0.5rem 0.75rem;
        line-height: 1.25;
        cursor: pointer;

        &:hover {
            background-color: var(--light-color);
        }
    }

    &__active {
        background-color: var(--light-color);
    }
}
</style>

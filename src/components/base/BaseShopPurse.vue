<template>
  <BaseCard hidden-background>
    <template #title>
      {{ $t('purse.title') }}
    </template>

    <template #body>
      <div class="block mb-1 purse purse--wp">
        <div class="purse__img purse__img--wp" />
        <span class="purse__value">{{ filters.formatNumber(props.vipPoints) }} WibboPoints</span>
      </div>
      <div class="block mb-1 purse purse--ltc">
        <div class="purse__img purse__img--ltc" />
        <span class="purse__value">{{ filters.formatNumber(props.limitCoins) }} LimitCoins</span>
      </div>
    </template>
  </BaseCard>
</template>

<script lang="ts" setup>
import * as filters from '~/utils/filters'

const props = defineProps({
  vipPoints: { type: Number, default: 0 },
  limitCoins: { type: Number, default: 0 }
})
</script>

<style lang="scss">
.purse {
    width: 100%;
    height: auto;
    padding: 5px;
    border-radius: 8px;
    text-align: right;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &:hover {
        text-decoration: none;
    }

    &--wp {
        background-color: #626262;
    }

    &--ltc {
        background-color: #5a254f;
    }

    &__img {
        display: block;
        float: left;
        width: 20px;
        height: 20px;
        margin: 4px;

        &--wp {
            background-image: url(~/assets/imgs/icons/wibbopoints.png);
        }

        &--ltc {
            background-image: url(~/assets/imgs/icons/ltc.png);
            width: 20px;
            height: 20px;
            background-size: 20px;
        }
    }

    &__value {
        line-height: 30px;
        font-weight: bold;
        text-transform: uppercase;
        margin-right: 4px;
        color: #fff;
    }
}
</style>

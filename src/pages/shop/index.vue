<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div class="col-span-1 md:col-span-2">
      <BaseCard>
        <template #title>
          Acheter des LimitCoins
        </template>

        <template #body>
          <div class="limitcoins">
            <div class="limitcoins__sac" />
            <div class="limitcoins__buy">
              <p class="limitcoins__about">
                Le <b>LimitCoin (LTC)</b> est une monnaie de l'hôtel. Le LimitCoin sert principalement à acheter des mobiliers en édition limitée, le premium club et diverses choses dans la boutique de l'hôtel.
              </p>

              <div class="px-2" style="background-color: #fff; border: 2px solid rgba(0, 0, 0, 0.2)">
                <div id="dedipass-0">
                  <iframe
                    id="dedipass-0-iframe"
                    :src="'//api.dedipass.com/pay-2/#9f48bdb2a6d4f5baed3ab24cfcc9a9d4&' + authUser.id + '&'"
                    style="width: 100%; border: 0 solid transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="disclaimer-buy">
            <h3 class="disclaimer-buy__title">
              {{ $t('shop-limitcoins.disclaimer-title') }}
              <i class="fas fa-exclamation-circle" />
            </h3>
            <span class="text-sm text-gray-400">
              {{ $t('shop-limitcoins.disclaimer-content-1') }}
              <NuxtLink :to="'/contact'">{{ $t('shop-limitcoins.disclaimer-link') }}</NuxtLink>
              {{ $t('shop-limitcoins.disclaimer-content-2') }}<br>
              {{ $t('shop-limitcoins.disclaimer-content-3') }}
            </span>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseShopPurse :vip-points="authUser.vip_points" :limit-coins="authUser.limit_coins" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['authenticated'],
  title: 'shop-limitcoins'
})

const { showAlert } = useNotification()
const { t } = useI18n()
const authUser = useAuthUser()

const onDedipass = (e: MessageEvent) => {
  const data = e.data ? e.data : ''

  if (data === '') {
    //
  } else if (data === 'pleasegotop') {
    const gototopdiv = document.getElementById('dedipass-0')
    if (gototopdiv) { gototopdiv.scrollIntoView(true) }
  } else if (data instanceof String && data.startsWith('takeacapture')) {
    //
  } else if (!isNaN(data) && data < 5000) {
    const iframeElement = document.getElementById('dedipass-0-iframe')
    if (iframeElement) { iframeElement.style.height = data + 'px' }
  } else {
    let result = null
    try {
      result = JSON.parse(data)
    } catch {}

    if (result == null) { return }

    if (result.status === 'success') {
      if (!isNaN(result.virtual_currency)) {
        authUser.value.limit_coins += +result.virtual_currency

        showAlert({
          message: t('shop-limitcoins.buy-sucess', [result.virtual_currency]),
          type: 'success'
        })
      }
    } else if (result.status === 'error') {
      showAlert({
        message: t('shop-limitcoins.buy-fail'),
        type: 'error'
      })
    }
  }
}

onMounted(() => window.addEventListener('message', onDedipass, false))
onBeforeUnmount(() => window.removeEventListener('message', onDedipass))
</script>

<style lang="scss">
.limitcoins {
    margin-bottom: 10px;

    &__sac {
        background-image: url(~/assets/imgs/shop/promo_ltc.png);
        width: 203px;
        height: 218px;
        margin: 5px;
        float: left;
    }

    &__buy {
        padding-top: 15px;
    }

    &__about {
        margin-top: 50px;
        font-weight: 500;
    }
}

.disclaimer-buy {
  padding: 5px;

  text-align: center;

    &__title {
        font-size: 1.4rem;
        font-weight: 500;
    }
}
</style>

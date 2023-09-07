<template>
  <div class="grid grid-cols-1 gap-4 mt-2 lg:grid-cols-3">
    <div class="col-span-1">
      <div class="card-intro card-intro--discovery">
        <h2 class="card-intro__title card-intro__title--discovery">
          {{ $t('index.intro-title-discovery') }}
        </h2>
        <span class="card-intro__about card-intro__about--discovery">
          {{ $t('index.intro-about-discovery') }}
        </span>
      </div>
    </div>
    <div class="col-span-1">
      <div class="card-intro card-intro--love">
        <h2 class="card-intro__title card-intro__title--love">
          {{ $t('index.intro-title-love') }}
        </h2>
        <span class="card-intro__about card-intro__about--love">
          {{ $t('index.intro-about-love') }}
        </span>
      </div>
    </div>
    <div class="col-span-1">
      <div class="card-intro card-intro--animation">
        <h2 class="card-intro__title card-intro__title--animation">
          {{ $t('index.intro-title-game') }}
        </h2>
        <span class="card-intro__about card-intro__about--animation">
          {{ $t('index.intro-about-game') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'index',
  middleware: ['un-authenticated']
})
</script>

<style lang="scss">
.header-register {
    @apply max-w-xl mx-auto;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 20px;
    border-radius: 5px;

    &__about {
        padding-bottom: 1rem;
        font-size: 2rem;
        color: #fff;
        text-align: center;
        text-shadow: 1px 0px 1px #000;
        margin-bottom: 5px;
    }
}

.card-intro {
    position: relative;
    text-align: center;
    border-radius: 10px;
    width: 100%;
    height: 272px;
    background-size: cover;
    margin-bottom: 1rem;
    box-shadow: 2px 4px 0 rgba(0, 0, 0, 0.15);
    overflow: hidden;

    &--discovery {
        background-image: url(~/assets/imgs/login/carousel_1.png);
    }

    &--love {
        background-image: url(~/assets/imgs/login/carousel_2.png);
    }

    &--animation {
        background-image: url(~/assets/imgs/login/carousel_3.png);
    }

    &__title {
        background-color: rgba(0, 0, 0, 0.6);
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        padding: 10px;
        margin: 0px;
        text-shadow: 0 2px 1px rgba(0, 0, 0, 0.3);
        font-size: 1.6rem;
        text-transform: uppercase;
        font-weight: 500;

        &--discovery {
            color: #d2bd37;
        }

        &--love {
            color: #ff367a;
        }

        &--animation {
            color: #1b8ed2;
        }
    }

    &__about {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        color: #ffffff;
        text-align: left;
        text-shadow: 0 2px 1px rgba(0, 0, 0, 0.3);
        padding: 8px;

        &--discovery {
            background-color: rgba(129, 116, 34, 0.6);
        }

        &--love {
            background-color: rgba(130, 42, 72, 0.8);
        }

        &--animation {
            background-color: rgba(16, 86, 127, 0.8);
        }
    }
}
</style>

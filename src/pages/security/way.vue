<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <div class="col-span-1">
      <BaseCard>
        <template #title>
          Jouer
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_7.png" class="mr-2" alt="Joue avec tes amis">
            <p>Joue avec tes amis, crée tes jeux, déchire tout et fais plein de rencontres !</p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Tricher
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_13.png" class="mr-2" alt="Tricheur ne font jamais long feu">
            <p>Les tricheurs ne font jamais long feu. Ils gâchent juste le plaisir des autres.</p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Tchater
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_8.png" class="mr-2" alt="Parle à tes amis">
            <p>Parle à tes amis, rencontre des nouveaux Wibbos et fais-toi une tonne de nouveaux potes...et plus!</p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Troller
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_14.png" class="mr-2" alt="Personne n'aime les trolls">
            <p>Personne n'aime les trolls, même pas leur mère, et personne ne tolère les agressions.</p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Trouver ton âme sœur
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_9.png" class="mr-2" alt="Trouver ton âme soeur">
            <p>Flirte, sors, tombe amoureux et rencontre peut-être ton âme sœur... ou frère...</p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Cyber
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_15.png" class="mr-2" alt="le cybersexe est interdit">
            <p>Le cybersexe est strictement interdit, les demandes de webcam entraîneront une sanction.</p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Aider
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_10.png" class="mr-2" alt="Aide un inconnu, gagne un ami">
            <p>Aide un inconnu, gagne un ami ! Ou deux, ou trois. Tu ne sais jamais qui tu vas rencontrer !</p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Piéger
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_16.png" class="mr-2" alt="Profiter des autres Wibbos">
            <p>Profiter des autres Wibbos crée généralement un mauvais karma... Et des émeutes.</p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Créer
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_10.png" class="mr-2" alt="Lâche ta créativité">
            <p>Lâche ta créativité, plus fort qu'Andy Warhol sous caféine ! Dépasse les limites du style et de la création ! Sois le meilleur !</p>
          </div>
        </template>
      </BaseCard>
    </div>

    <div class="col-span-1">
      <BaseCard class="h-full">
        <template #title>
          Copier
        </template>

        <template #body>
          <div class="flex flex-col items-center p-2 lg:h-80 sm:flex-row">
            <img src="~/assets/imgs/safety/page_16.png" class="mr-2" alt="Crée, evite de copier">
            <p>Crée, evite de copier.</p>
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: 'what-is'
})
</script>

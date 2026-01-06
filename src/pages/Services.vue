<script setup lang="ts">
import AppHeader from '$src/components/AppHeader.vue'
import AppFooter from '$src/components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-[#f5f7fb] flex flex-col">
    
    <AppHeader />

    <main class="flex-1">
      <div class="w-full px-10 py-10">

        <h1 class="text-4xl font-bold text-[#111827] mb-8">
          Usługi medyczne
        </h1>

        <section class="grid md:grid-cols-2 gap-8 text-[#111827]">

          <div class="bg-white rounded-2xl shadow-md p-8">
            <h2 class="text-2xl font-semibold mb-5">
              Konsultacje specjalistyczne
            </h2>
            <ul class="list-disc pl-5 space-y-2 text-base leading-relaxed">
              <li>Kardiologia – badanie EKG, echo serca, holter</li>
              <li>Ortopedia – USG stawów, rehabilitacja</li>
              <li>Pediatria – bilanse zdrowia, szczepienia</li>
              <li>Dermatologia – dermatoskopia, kriochirurgia</li>
              <li>Ginekologia – USG, cytologia, porady</li>
              <li>Neurologia – EEG, konsultacje</li>
            </ul>
          </div>

          <div class="bg-white rounded-2xl shadow-md p-8">
            <h2 class="text-2xl font-semibold mb-5">
              Badania diagnostyczne
            </h2>
            <ul class="list-disc pl-5 space-y-2 text-base leading-relaxed">
              <li>Badania laboratoryjne – pobrania od pon–pt</li>
              <li>USG – jamy brzusznej, tarczycy, stawów</li>
              <li>EKG, holter EKG, holter ciśnienia</li>
              <li>Echo serca, doppler naczyń</li>
              <li>Spirometria, RTG cyfrowe</li>
              <li>Dermatoskopia komputerowa</li>
            </ul>
          </div>

          <div class="bg-white rounded-2xl shadow-md p-8">
            <h2 class="text-2xl font-semibold mb-5">
              Zabiegi
            </h2>
            <ul class="list-disc pl-5 space-y-2 text-base leading-relaxed">
              <li>Iniekcje dostawowe</li>
              <li>Usuwanie zmian skórnych</li>
              <li>Kriochirurgia</li>
              <li>Elektrokoagulacja</li>
              <li>Opatrunki i przewiązania</li>
            </ul>
          </div>

          <div class="bg-white rounded-2xl shadow-md p-8">
            <h2 class="text-2xl font-semibold mb-5">
              Programy profilaktyczne
            </h2>
            <ul class="list-disc pl-5 space-y-2 text-base leading-relaxed">
              <li>Programy szczepień dla dzieci i dorosłych</li>
              <li>Badania profilaktyczne</li>
              <li>Badania okresowe pracowników</li>
              <li>Badania kierowców</li>
              <li>Pakiety badań check-up</li>
            </ul>
          </div>

        </section>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

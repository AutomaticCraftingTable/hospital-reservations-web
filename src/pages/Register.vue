<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter , RouterLink} from "vue-router";
  import { useAuth } from "$src/components/useAuth";
  
  const router = useRouter();
  const { registerPatient } = useAuth();
  
  // поля формы
  const name = ref("");
  const surname = ref("");
  const email = ref("");
  const password = ref("");
  const passwordConfirmation = ref("");
  
  const register = async () => {
    try {
      await registerPatient({
        name: name.value,
        surname: surname.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      });
  
      router.push("/login");
    } catch (e) {
      alert("Błąd rejestracji");
    }
  };
  </script>
  
  

<template>
  <div class="min-h-screen bg-[#f5f7fb] flex flex-col">

    <header class="flex items-center justify-between px-10 py-6">
      
      <RouterLink to="/" class="w-10 h-10">
        <img
          src="/src/assets/stetho.png"
          alt="Logo"
          class="w-10 h-10 object-contain rounded-xl shadow-md"
        />
      </RouterLink>
    
      <nav class="flex items-center gap-6 text-base">
    
        <RouterLink
          to="/login"
          class="text-[#1f2933] hover:text-black font-medium transition"
        >
          Zaloguj się
        </RouterLink>
    
        <!-- 🔵 Nowa opcja — Rejestracja lekarza -->
        <RouterLink
          to="/register-doctor"
          class="text-[#0f6bff] hover:text-[#0057e6] font-medium transition"
        >
          Rejestracja lekarza
        </RouterLink>
    
        <RouterLink
          to="/register"
          class="px-5 py-2 rounded-full bg-[#0f6bff] text-white font-semibold shadow hover:bg-[#0057e6] transition text-base"
        >
          Zarejestruj się
        </RouterLink>
    
      </nav>
    </header>
    

    <main class="flex-1 flex items-center justify-center">
      <div class="bg-white rounded-3xl shadow-lg px-14 py-12 max-w-lg w-full">

        <div class="flex items-center gap-4 mb-8">
          <img
            src="/src/assets/lekmed-logo.png"
            alt="Lekmed Logo"
            class="w-20 h-20 object-contain"
          />

          <div class="flex flex-col">
            <h1 class="text-4xl font-extrabold tracking-wide text-[#0f6bff] leading-tight">
              LEKMED
            </h1>

            <p
              class="text-sm text-[#4b6a88] mt-1 uppercase tracking-[0.2em] leading-snug"
            >
              TO JEST SYSTEM ZARZĄDZANIA <br>
              PRZYCHODNIĄ
            </p>
          </div>
        </div>

        <form class="space-y-4">

      <div class="flex gap-3">
        <input
          v-model="name"
          type="text"
          placeholder="Imię"
          class="w-1/2 rounded-full bg-[#f6f8ff] border border-[#edf1ff] px-5 py-3 text-base text-[#1f2933] placeholder:text-[#c3cee9] outline-none focus:ring-2 focus:ring-[#0f6bff]"
        />

        <input
          v-model="surname"
          type="text"
          placeholder="Nazwisko"
          class="w-1/2 rounded-full bg-[#f6f8ff] border border-[#edf1ff] px-5 py-3 text-base text-[#1f2933] placeholder:text-[#c3cee9] outline-none focus:ring-2 focus:ring-[#0f6bff]"
        />
      </div>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full rounded-full bg-[#f6f8ff] border border-[#edf1ff] px-5 py-3 text-base text-[#1f2933] placeholder:text-[#c3cee9] outline-none focus:ring-2 focus:ring-[#0f6bff]"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Hasło"
        class="w-full rounded-full bg-[#f6f8ff] border border-[#edf1ff] px-5 py-3 text-base text-[#1f2933] placeholder:text-[#c3cee9] outline-none focus:ring-2 focus:ring-[#0f6bff]"
      />

      <input
        v-model="passwordConfirmation"
        type="password"
        placeholder="Powtórz hasło"
        class="w-full rounded-full bg-[#f6f8ff] border border-[#edf1ff] px-5 py-3 text-base text-[#1f2933] placeholder:text-[#c3cee9] outline-none focus:ring-2 focus:ring-[#0f6bff]"
      />

      <button
        @click.prevent="register"
        class="w-full mt-3 rounded-full bg-[#0f6bff] text-white font-semibold py-3 text-base shadow hover:bg-[#0057e6] transition"
      >
        Zarejestruj się
      </button>

      </form>


        <p class="mt-3 text-xs text-[#9aa6c1] text-center leading-snug max-w-sm mx-auto">
          Kontynuując, akceptujesz nasze Warunki korzystania z usługi i Politykę prywatności.
        </p>

      </div>
    </main>
  </div>
</template>

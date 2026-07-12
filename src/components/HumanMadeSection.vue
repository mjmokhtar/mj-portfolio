<template>
  <section class="bg-primary">
    <div class="px-8 max-w-7xl mx-auto py-6">

      <!-- pembatas section — pola sama dengan section lain -->
      <div class="mt-6 space-y-2">
        <div class="h-0.5 bg-secondary"
          data-aos="fade-up" data-aos-duration="1000"></div>
        <h3 class="text-secondary text-base font-medium"
          data-aos="fade-up" data-aos-duration="1500">
          <span>house</span> <span class="font-bold">rules</span>
        </h3>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-8">

        <!-- ilustrasi (tidak berubah) -->
        <div class="flex justify-center lg:justify-start"
          data-aos="fade-up" data-aos-duration="2000">
          <img src="/human.png"
            alt="Penjaga dengan tanda dilarang robot"
            class="w-full max-w-sm"
            style="mix-blend-mode: multiply;" />
        </div>

        <!-- statement -->
        <div data-aos="fade-up" data-aos-duration="2500">
          <h2 style="font-family:'Playfair Display',serif;font-size:clamp(2.2rem,5vw,4rem);font-weight:700;font-style:italic;line-height:1.1;color:#161614;">
            Handmade,<br/>vibing not allowed.
          </h2>
          <p class="mt-6 text-sm leading-relaxed text-secondary opacity-60 max-w-md">
            Every circuit, every line of code, and every pixel on this site
            was put here by a human who enjoys mengoprek. Bots wait outside.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>
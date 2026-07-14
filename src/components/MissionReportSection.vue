<script setup>
const report = `# MISSION REPORT MJ-2026                                                    1/1

SUBJECT: TRANSITION TO IOT PRODUCT & PROJECT MANAGEMENT
EARTH DATE: 2026, ONGOING
MISSION DIRECTOR: M.J. MOKHTAR

---

## OVERVIEW

During years of field deployment across railway and industrial sites, the
candidate progressed from soldering and firmware toward owning what gets
built and why. These signatures do not match a typical engineer profile
and warrant further investigation.

### EVIDENCE

Skills & Certification Analysis

┌──────────────────────────────┬─────────────┬──────────────────────────────┐
│ Module                       │ Status      │ Notes                        │
├──────────────────────────────┼─────────────┼──────────────────────────────┤
│ Project Management (PMBOK 8) │ ACQUIRED    │ Full PM document pack built  │
│ IoT Network Engineer         │ CERTIFIED   │ BNSP, LSP Telekomdigi 2024   │
│ Field Deployment Ops         │ ACQUIRED    │ 50+ train units, live sites  │
│ Product Strategy & PRD       │ IN PROGRESS │ Applied on internal builds   │
└──────────────────────────────┴─────────────┴──────────────────────────────┘

Mission Log

a) Origin: self-taught embedded systems — firmware, PCB design, and
   industrial protocols.
b) Expansion: backend services, dashboards, and system integration
   delivered for clients.
c) Current trajectory: bridging engineering execution with product
   strategy.

### RECOMMENDATIONS

a) Deploy the candidate on product-critical IoT missions.
b) Establish long-term collaboration for end-to-end delivery.
c) Prepare follow-up interviews with equipment designed to verify
   these signatures.
`
</script>

<template>
  <section class="bg-primary">

    <!-- pembatas section standar -->
    <div class="px-8 max-w-7xl mx-auto py-6">
      <div class="mt-6 space-y-2">
        <div class="h-0.5 bg-secondary" data-aos="fade-up" data-aos-duration="1000" />
        <h3 class="text-secondary text-base font-medium" data-aos="fade-up" data-aos-duration="1500">
          <span>Mission</span> <span class="font-bold">report</span>
        </h3>
      </div>
    </div>

    <!-- stage gelap -->
    <div class="mr-stage">
      <div class="mr-max">

        <!-- dekorasi: SQL oranye, sebagian di balik kertas -->
        <pre class="mr-sql" aria-hidden="true">
SELECT
    mission_name,
    launch_date,
    certification
FROM
    iot_deployments;</pre>


        <!-- comment ░ -->
        <p class="mr-comment" aria-hidden="true">
          ░&nbsp;&nbsp;MISSION EVIDENCE,
          <br />░&nbsp;&nbsp;PRINTED AND FILED FOR
          <br />░&nbsp;&nbsp;YOUR PROMPT REVIEW
        </p>

        <!-- printout abu-abu -->
        <div class="mr-printout">
          <div class="mr-holes mr-holes-l" aria-hidden="true" />
          <div class="mr-holes mr-holes-r" aria-hidden="true" />
          <pre class="mr-pre">{{ report }}</pre>
          <div class="mr-stamp" aria-hidden="true">STATUS: IN PROGRESS</div>
        </div>

        <!-- stempel -->
        

      </div>
    </div>

  </section>
</template>

<style scoped>
.mr-stage {
  /* --stage: #1e1e1c; */
  --paper: #fffffa;
  --ink:   #1a1a17;
  --accent: #e8912d;
  --faint: #4a4a46;

  background: var(--stage);
  overflow: hidden;
  font-family: 'Departure Mono', monospace;
}
.mr-max {
  position: relative;
  max-width: 80rem;
  margin: 0 auto;
  padding: 90px 2rem 110px;
}

/* ── dekorasi SQL — z-index di bawah kertas, ala #code-sql ── */
.mr-sql {
  position: absolute;
  left: 60px;
  bottom: 60px;
  margin: 0;
  font-family: inherit;
  font-size: 42px;
  line-height: 1.25;
  color: var(--accent);
  z-index: 0;
  user-select: none;
}

/* ── diagram teknik — ala #mercury-diagram ── */
.mr-diagram {
  position: absolute;
  top: 20px;
  left: -40px;
  width: 320px;
  z-index: 0;
}

/* ── comment ░ — ala #code .comment (warna mud) ── */
.mr-comment {
  position: absolute;
  top: 34px;
  right: 12%;
  width: 200px;
  margin: 0;
  font-size: 11px;
  line-height: 1.55;
  color: #8a8a82;
  z-index: 2;
}

/* ── printout — ala Printout class="light" color="grey" ── */
.mr-printout {
  position: relative;
  margin: 90px auto 0;
  margin-left: 22%;               /* ala left:296px — kertas condong kanan */
  max-width: 800px;
  background: var(--paper);
  box-shadow: 0 18px 50px rgba(0,0,0,0.45);
  z-index: 1;
}
.mr-holes {
  position: absolute; top: 0; bottom: 0;
  width: 52px;
  /* lubang gelap: stage terlihat menembus kertas */
  background-image: radial-gradient(circle, #f4f5ef 8px, transparent 8.5px);
  background-size: 52px 82px;
  background-position: center 40px;
  background-repeat: repeat-y;
}
.mr-holes-l { left: 0; }
.mr-holes-r { right: 0; }

/* pre — metrik persis aslinya: 13.75px, contenteditable */
.mr-pre {
  margin: 0;
  padding: 15px 78px 15px;
  font-family: inherit;
  font-size: 13.75px;
  line-height: 1.5;
  color: var(--ink);
  white-space: pre;
  overflow: hidden;
  /* outline: none;                  contenteditable tanpa ring focus */
  /* caret-color: var(--accent); */
}

.mr-stamp {
  position: absolute;
  bottom: 52px;
  right: 100px;                 /* di dalam kertas, setelah jalur lubang kanan */
  padding: 10px 24px;
  border: 3.5px solid #c05a10;
  color: #c05a10;
  font-size: 21px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  white-space: nowrap;
  transform: rotate(-6deg);
  pointer-events: none;

  /* tinta menyerap ke kertas, bukan menempel di atasnya */
  mix-blend-mode: multiply;
  opacity: 0.88;

  /* tekstur tinta belang — noise sebagai mask */
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' seed='11'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0.45 0.7 0.85 1 1 1 1 1 1 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='240' height='90' filter='url(%23n)'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' seed='11'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0.45 0.7 0.85 1 1 1 1 1 1 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='240' height='90' filter='url(%23n)'/%3E%3C/svg%3E");
  -webkit-mask-size: 240px 90px;
  mask-size: 240px 90px;
}

/* ── breakpoints mengikuti pola aslinya ── */
@media (max-width: 1115px) {
  .mr-printout { margin-left: 8%; }
  .mr-comment  { right: 4%; }
}
@media (max-width: 767px) {
  .mr-max { padding: 60px 1.5rem 70px; }
  .mr-sql { font-size: 26px; bottom: 30px; }
  .mr-diagram { display: none; }
  .mr-comment { position: static; width: auto; margin-bottom: 20px; }

  /* kertas: font tetap, crop kanan — perlakuan sama dengan surat */
  .mr-printout {
    margin: 20px 0 0;              /* tidak digeser ke kiri lagi */
    width: calc(100% + 160px);     /* luber hanya ke kanan */
    max-width: none;
  }
  .mr-pre {
    padding: 44px 0 50px 70px;     /* teks mulai setelah jalur lubang kiri */
    user-select: none;
    pointer-events: none;
  }
}
</style>
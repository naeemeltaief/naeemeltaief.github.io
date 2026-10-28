<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import WorkSection from '@/components/sections/WorkSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ExpertiseSection from '@/components/sections/ExpertiseSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import ProcessSection from '@/components/sections/ProcessSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import { useHead } from '@/composables/head'

useHead({ path: '/' })
</script>

<template>
  <div>
    <HeroSection />
    <WorkSection />
    <AboutSection />
    <ExperienceSection />
    <ExpertiseSection />
    <ServicesSection />
    <ProcessSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { NuxtLinkLocale } from '#components';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { MENU_ITEMS } from '~/lib/base.constants';
import { Bars2Icon, GlobeEuropeAfricaIcon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value);
});
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
    <div class="container flex h-14 items-center justify-between">
      <div class="flex items-center gap-2">
        <NuxtLinkLocale to="/">
          <span class="flex items-center gap-1 text-2xl font-bold">
            <span>Toolbox</span>
          </span>
        </NuxtLinkLocale>
        <NavigationMenu class="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem v-for="item in MENU_ITEMS">
              <NavigationMenuLink
                exact-active-class="!bg-accent/50"
                :href="item.link"
                :as="NuxtLinkLocale"
                :class="navigationMenuTriggerStyle()"
              >
                <ClientOnly>
                  <span>{{ $t(item.name) }}</span>
                </ClientOnly>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div class="flex items-center gap-2 md:gap-4">
        <ClientOnly>
          <Button variant="ghost" class="p-0" @click="toggleDark()" aria-label="Toggle dark mode">
            <SunIcon v-if="isDark" class="size-6" />
            <MoonIcon v-else class="size-6" />
          </Button>
        </ClientOnly>
        <ClientOnly v-if="availableLocales.length">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <GlobeEuropeAfricaIcon class="size-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel v-for="locale in availableLocales" :key="locale.code">
                <Button :as="NuxtLinkLocale" :to="switchLocalePath(locale.code)" variant="link"
                  >{{ locale.name }}
                </Button>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </ClientOnly>
        <Sheet>
          <SheetTrigger class="lg:hidden">
            <Bars2Icon class="size-6" />
          </SheetTrigger>
          <SheetContent hide-default class="w-[400px] sm:w-[540px]">
            <SheetHeader class="items-end">
              <SheetTitle class="sr-only">Mobile Menu</SheetTitle>
              <SheetDescription class="sr-only">Mobile Menu</SheetDescription>
              <SheetClose>
                <XMarkIcon class="size-6" />
              </SheetClose>
            </SheetHeader>
            <NavigationMenu orientation="vertical">
              <NavigationMenuList class="flex-col items-start">
                <NavigationMenuItem v-for="item in MENU_ITEMS" class="!m-0">
                  <NavigationMenuLink
                    exact-active-class="!bg-accent/50"
                    :href="item.link"
                    :as="NuxtLinkLocale"
                    :class="navigationMenuTriggerStyle()"
                  >
                    <SheetClose>
                      {{ $t(item.name) }}
                    </SheetClose>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
</template>

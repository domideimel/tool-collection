<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import { NuxtLink } from '#components';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { MENU_ITEMS } from '~/lib/base.constants';
import { Bars2Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/vue/24/outline';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
    <div class="container flex h-14 items-center justify-between">
      <div class="flex items-center gap-2">
        <NuxtLink to="/">
          <span class="flex items-center gap-1 text-2xl font-bold">
            <span>Toolbox</span>
          </span>
        </NuxtLink>
        <NavigationMenu class="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem v-for="item in MENU_ITEMS">
              <NavigationMenuLink
                exact-active-class="!bg-accent/50"
                :href="item.link"
                :as="NuxtLink"
                :class="navigationMenuTriggerStyle()"
              >
                {{ item.name }}
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="icon" @click="toggleDark()" aria-label="Toggle dark mode">
          <SunIcon v-if="isDark" class="h-6 w-6" />
          <MoonIcon v-else class="h-6 w-6" />
        </Button>
        <Sheet>
          <SheetTrigger class="lg:hidden">
            <Bars2Icon class="h-6 w-6" />
          </SheetTrigger>
          <SheetContent hide-default class="w-[400px] sm:w-[540px]">
            <SheetHeader class="items-end">
              <SheetTitle class="sr-only">Mobile Menu</SheetTitle>
              <SheetDescription class="sr-only">Mobile Menu</SheetDescription>
              <SheetClose>
                <XMarkIcon class="h-6 w-6" />
              </SheetClose>
            </SheetHeader>
            <NavigationMenu orientation="vertical">
              <NavigationMenuList class="flex-col items-start">
                <NavigationMenuItem v-for="item in MENU_ITEMS" class="!m-0">
                  <NavigationMenuLink
                    exact-active-class="!bg-accent/50"
                    :href="item.link"
                    :as="NuxtLink"
                    :class="navigationMenuTriggerStyle()"
                  >
                    <SheetClose>
                      {{ item.name }}
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

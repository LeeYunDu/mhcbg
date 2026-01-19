<template>
  <section class="layout-side" :class="[]">
    <section class="content scroll-y">
      <AppMenu :menus="menus" />
    </section>
  </section>
</template>
<script lang="ts" setup>
import AppMenu from './common/menu.vue'
import useApp from '@/hooks/state/use-app'
import { useBussinessRoutes } from '@/router/modules/bussiness'
// hooks
// const { sideMenus: menus, sideTheme } = useApp()
const menus = useBussinessRoutes()
// const sideTheme = ''
</script>
<style lang="scss" scoped>
.layout-side {
  width: 100%;
  min-height: 100%;
  max-height: 100%;
  border-radius: 4px;
  overflow: hidden;
  .content {
    padding: 8px;
  }

  :deep() {
    .el-menu {
      border-right: none;

      .el-sub-menu__title{
          border-radius: 4px;
        &:hover{
          background: var(--sidebar-hover-color);
          color: var(--sidebar-text-color-hover);
        }
      }

      .el-menu-item {
        position: relative;
        height: 46px;
        line-height: unset;
        font-size: 16px;
        color: var(--sidebar-text-color);
        border-radius: 4px;
        &:hover {
          background: var(--sidebar-hover-color);
          color: var(--sidebar-text-color-hover);
        }

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 0;
          width: 0px;
          height: 20%;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          background: var(--el-color-primary);
          transform: translate(0, -50%);
          transition: height 0.2s;
        }
        &.is-active {
          background: var(--sidebar-active-color);
          border-radius: 4px;
          font-weight: 500;
          color: var(--sidebar-text-color-active);
          &::after {
            width: 4px;
            height: 100%;
          }
        }
      }
      .el-sub-menu__title {
        display: flex;
        align-items: center;
        font-size: 16px;
      }
    }
  }

  .content {
    width: 100%;
    height: 100%;
  }
}
</style>

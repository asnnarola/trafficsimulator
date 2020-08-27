/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  // {
  //   url: "/apps/email",
  //   name: "Email",
  //   slug: "email",
  //   icon: "MailIcon",
  //   i18n: "Email",
  // },
  // {
  //   url: null,
  //   name: 'Dashboard',
  //   tag: '3',
  //   tagColor: 'warning',
  //   icon: 'HomeIcon',
  //   i18n: 'Dashboard',
  //   submenu: [{
  //       url: '/dashboard/client',
  //       name: 'Client',
  //       slug: 'dashboard-client',
  //       i18n: 'Client'
  //     },
  //     {
  //       url: '/dashboard/allcampaign',
  //       name: 'Campaign',
  //       slug: 'dashboard-allcampaign',
  //       i18n: 'Campaign'
  //     },
  //     {
  //       url: '/dashboard/viewsstatus',
  //       name: 'ViewStatus',
  //       slug: 'dashboard-viewstatus',
  //       i18n: 'ViewStatus'
  //     }
  //   ]
  // },
  {
    header: 'Clients',
    icon: 'FileIcon',
    i18n: 'Clients',
    items: [
      {
        url: '/dashboard/client',
        slug: 'dashboard-client',
        name: 'Client',
        icon: 'UserIcon',
        i18n: 'Client'
      },

    ]
  },
  {
    header: 'Campaigns',
    icon: 'FileIcon',
    i18n: 'Campaigns',
    items: [
      {
        url: '/dashboard/allcampaign',
        slug: 'dashboard-allcampaign',
        name: 'Campaigns',
        icon: 'PackageIcon',
        i18n: 'Campaigns'
      },

    ]
  },

]

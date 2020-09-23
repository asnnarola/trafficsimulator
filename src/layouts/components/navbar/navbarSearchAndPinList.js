/* eslint-disable */
export default {
  pages: {
    key: "title",
    data: [
      // DASHBOARDS

      {
        title: "Dashboard", url: "/dashboard/appinfo", icon: "HomeIcon", is_bookmarked: false,
        rule: "admin", requiresAuth: true
      },

      { title: "Client Dashboard", url: "/dashboard/client", icon: "HomeIcon", is_bookmarked: false },

      { title: "Campaign Dashboard", url: "/dashboard/allcampaign", icon: "HomeIcon", is_bookmarked: false },
    ]
  },
  files: {
    key: "file_name",
    data: [

    ]
  },
  contacts: {
    key: "name",
    data: [

    ]
  },
}
/* eslint-enable */

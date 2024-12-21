export default function (path: string): string {
    const assets = import.meta.glob("~/assets/img/**/*", {
      eager: true,
      import: "default",
    });
    // @ts-expect-error: wrong type info
    return assets["/assets/img/" + path];
  }
  //Usage: <img :src="useAsset(dynamic_image_name + '.svg')" alt="Discover Nuxt 3" />
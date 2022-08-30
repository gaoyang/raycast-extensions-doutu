import { useEffect, useState } from "react";
import { Grid } from "@raycast/api";
import clipboardService from "./services/clipboardService";
import sourcesService from "./services/sourcesService";
import { IDoutuImage } from "./services/sources";

export default function Command() {
  const [itemSize, setItemSize] = useState<Grid.ItemSize>(Grid.ItemSize.Medium);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<IDoutuImage[]>([]);

  useEffect(() => {
    refreshList("快扶我", 1, 10);
  }, []);

  const refreshList = async (keyword: string, pageIndex: number, pageSize: number) => {
    setList(await sourcesService.get(keyword, pageIndex, pageSize));
  };

  return (
    <Grid
      isLoading={isLoading}
      onSelectionChange={(id) => {
        if (id) {
          const item = list.find((o) => o.id.toString() == id);
          item && clipboardService.imageToClipboard(item.url);
        }
      }}
      searchBarAccessory={
        <Grid.Dropdown
          tooltip="Grid Item Size"
          storeValue
          onChange={(newValue) => {
            setItemSize(newValue as Grid.ItemSize);
            setIsLoading(false);
          }}
        >
          <Grid.Dropdown.Item title="Large" value={Grid.ItemSize.Large} />
          <Grid.Dropdown.Item title="Medium" value={Grid.ItemSize.Medium} />
          <Grid.Dropdown.Item title="Small" value={Grid.ItemSize.Small} />
        </Grid.Dropdown>
      }
    >
      {!isLoading &&
        list.map((item, index) => <Grid.Item key={index} id={item.id.toString()} content={{ source: item.url }} />)}
    </Grid>
  );
}

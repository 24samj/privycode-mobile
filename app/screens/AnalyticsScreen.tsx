import { View, FlatList, RefreshControl } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "../../src/constants/Colors";
import { SummaryCard, LinkItem, ConfirmDeleteModal } from "../components";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useHideTabBarOnScroll from "../hooks/useHideTabBarOnScroll";
import { fetchDashboard, deleteLink } from "@/api";

const AnalyticsScreen = () => {
  const theme = useTheme() as AppTheme;
  const colors = theme.colors;

  const { onScroll } = useHideTabBarOnScroll();

  const queryClient = useQueryClient();

  const [deletionId, setDeletionId] = React.useState<number | null>(null);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });

  const deleteMutation = useMutation({
    mutationFn: (repoId: number) => deleteLink(repoId),
    onMutate: async (repoId: number) => {
      await queryClient.cancelQueries({ queryKey: ["dashboard"] });
      const previous = queryClient.getQueryData<ViewerLink[]>(["dashboard"]);
      queryClient.setQueryData<ViewerLink[]>(["dashboard"], (old) =>
        (old ?? []).filter((l) => l.ID !== repoId),
      );
      return { previous };
    },
    onError: (_err, _, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["dashboard"], context.previous);
      }
    },
  });

  const links: ViewerLink[] = data ?? [];
  const totalViews = links.reduce((acc, l) => acc + l.view_count, 0);

  const renderItem = ({ item, index }: { item: ViewerLink; index: number }) => (
    <LinkItem
      item={item}
      index={index}
      colors={colors}
      onEdit={() => {}}
      onDelete={() => setDeletionId(item.ID)}
    />
  );

  return (
    <View className="flex-1">
      <FlatList
        data={links}
        keyExtractor={(item) => item.token}
        ListHeaderComponent={() => (
          <SummaryCard
            totalLinks={links.length}
            totalViews={totalViews}
            colors={colors}
          />
        )}
        renderItem={renderItem}
        onScroll={onScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        contentContainerClassName="p-4 pb-12"
      />
      <ConfirmDeleteModal
        visible={deletionId !== null}
        onCancel={() => setDeletionId(null)}
        onConfirm={() => {
          if (deletionId != null) deleteMutation.mutate(deletionId);
          setDeletionId(null);
        }}
      />
    </View>
  );
};

export default AnalyticsScreen;

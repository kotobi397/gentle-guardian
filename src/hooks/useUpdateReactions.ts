import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface KotobiReaction {
  emoji: string;
  label: string;
}

/** ايموجيات كتبي الخاصة للتفاعل مع التحديثات */
export const KOTOBI_REACTIONS: KotobiReaction[] = [
  { emoji: '📚', label: 'كتاب رائع' },
  { emoji: '❤️', label: 'أحببته' },
  { emoji: '🔥', label: 'ناري' },
  { emoji: '✨', label: 'مبهر' },
  { emoji: '🎉', label: 'مبروك' },
  { emoji: '🤯', label: 'مذهل' },
  { emoji: '🙏', label: 'شكراً' },
  { emoji: '☕', label: 'قراءة ممتعة' },
  { emoji: '🧠', label: 'أفادني' },
  { emoji: '🖋️', label: 'إبداع' },
  { emoji: '😍', label: 'أعجبني' },
  { emoji: '👏', label: 'أحسنتم' },
];

type CountsMap = Record<string, Record<string, number>>;
type MineMap = Record<string, Set<string>>;

export const useUpdateReactions = (updateIds: string[]) => {
  const { user } = useAuth();
  const [counts, setCounts] = useState<CountsMap>({});
  const [mine, setMine] = useState<MineMap>({});
  const key = updateIds.join(',');

  const fetchReactions = useCallback(async () => {
    if (updateIds.length === 0) return;
    const { data, error } = await supabase
      .from('site_update_reactions')
      .select('update_id, emoji, user_id')
      .in('update_id', updateIds);

    if (error || !data) return;

    const nextCounts: CountsMap = {};
    const nextMine: MineMap = {};
    for (const row of data) {
      nextCounts[row.update_id] = nextCounts[row.update_id] || {};
      nextCounts[row.update_id][row.emoji] = (nextCounts[row.update_id][row.emoji] || 0) + 1;
      if (user && row.user_id === user.id) {
        nextMine[row.update_id] = nextMine[row.update_id] || new Set();
        nextMine[row.update_id].add(row.emoji);
      }
    }
    setCounts(nextCounts);
    setMine(nextMine);
  }, [key, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  const toggleReaction = useCallback(
    async (updateId: string, emoji: string) => {
      if (!user) return { needsAuth: true };
      const already = mine[updateId]?.has(emoji);

      // تحديث متفائل
      setCounts(prev => {
        const forUpdate = { ...(prev[updateId] || {}) };
        const next = (forUpdate[emoji] || 0) + (already ? -1 : 1);
        if (next <= 0) delete forUpdate[emoji];
        else forUpdate[emoji] = next;
        return { ...prev, [updateId]: forUpdate };
      });
      setMine(prev => {
        const set = new Set(prev[updateId] || []);
        if (already) set.delete(emoji);
        else set.add(emoji);
        return { ...prev, [updateId]: set };
      });

      if (already) {
        await supabase
          .from('site_update_reactions')
          .delete()
          .eq('update_id', updateId)
          .eq('user_id', user.id)
          .eq('emoji', emoji);
      } else {
        await supabase
          .from('site_update_reactions')
          .insert({ update_id: updateId, user_id: user.id, emoji });
      }
      return { needsAuth: false };
    },
    [user, mine]
  );

  return { counts, mine, toggleReaction, refetch: fetchReactions };
};

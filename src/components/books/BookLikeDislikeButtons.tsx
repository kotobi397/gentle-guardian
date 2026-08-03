import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useBookLikes } from '@/hooks/useBookLikes';
import { useBookDislikes } from '@/hooks/useBookDislikes';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';

interface BookLikeDislikeButtonsProps {
  bookId: string;
  size?: 'sm' | 'lg';
  showCount?: boolean;
  className?: string;
  likeClassName?: string;
  dislikeClassName?: string;
  layout?: 'row' | 'column';
}

export const BookLikeDislikeButtons: React.FC<BookLikeDislikeButtonsProps> = ({
  bookId,
  size = 'sm',
  showCount = true,
  className = '',
  likeClassName = '',
  dislikeClassName = '',
  layout = 'row',
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { likesCount, isLiked, loading: likeLoading, toggleLike, removeLikeLocally } = useBookLikes(bookId);
  const { dislikesCount, isDisliked, loading: dislikeLoading, toggleDislike, removeDislikeLocally } = useBookDislikes(bookId);

  const requireAuth = () => {
    const redirectPath = location.pathname + location.search;
    localStorage.setItem('auth_redirect_path', redirectPath);
    navigate('/auth');
  };

  const handleLike = async () => {
    if (!user) {
      toast.error('يجب تسجيل الدخول لإضافة الإعجاب');
      requireAuth();
      return;
    }
    if (isDisliked) removeDislikeLocally();
    try {
      await toggleLike();
    } catch (e) {
      console.error('خطأ في تبديل الإعجاب:', e);
      toast.error('حدث خطأ، حاول مرة أخرى');
    }
  };

  const handleDislike = async () => {
    if (!user) {
      toast.error('يجب تسجيل الدخول لإضافة عدم الإعجاب');
      requireAuth();
      return;
    }
    if (isLiked) removeLikeLocally();
    try {
      await toggleDislike();
    } catch (e) {
      console.error('خطأ في تبديل عدم الإعجاب:', e);
      toast.error('حدث خطأ، حاول مرة أخرى');
    }
  };



  const iconBoxClasses = {
    sm: 'h-5 w-5',
    lg: 'h-7 w-7',
  };
  const buttonSizeClasses = {
    sm: 'h-9 px-3 text-sm',
    lg: 'h-12 px-5 text-base',
  };

  const containerClass = layout === 'row' ? 'flex items-center gap-2' : 'flex flex-col gap-2';

  const baseClash =
    'inline-flex items-center gap-2 rounded-2xl border-2 font-extrabold transition-transform active:scale-95 disabled:opacity-60';

  return (
    <div className={`${containerClass} ${className}`} dir="rtl">
      <button
        type="button"
        onClick={handleLike}
        disabled={likeLoading || dislikeLoading}
        aria-pressed={isLiked}
        aria-label="أعجبني"
        className={`${baseClash} ${buttonSizeClasses[size]} ${likeClassName} border-clash-gold-deep/70 bg-clash-deep shadow-[0_3px_0_hsl(var(--clash-panel-deep))] ${
          isLiked ? '!text-clash-gold ring-2 ring-clash-gold/70' : '!text-clash-foreground/90'
        }`}
      >
        <span className={iconBoxClasses[size]}>
          <IconBookThumbUp />
        </span>
        {showCount && <span className="tabular-nums">{likesCount}</span>}
      </button>

      <button
        type="button"
        onClick={handleDislike}
        disabled={likeLoading || dislikeLoading}
        aria-pressed={isDisliked}
        aria-label="لم يعجبني"
        className={`${baseClash} ${buttonSizeClasses[size]} ${dislikeClassName} border-clash-gold-deep/70 bg-clash-deep shadow-[0_3px_0_hsl(var(--clash-panel-deep))] ${
          isDisliked ? '!text-clash-gold ring-2 ring-clash-gold/70' : '!text-clash-foreground/90'
        }`}
      >
        <span className={iconBoxClasses[size]}>
          <IconBookThumbDown />
        </span>
        {showCount && <span className="tabular-nums">{dislikesCount}</span>}
      </button>
    </div>
  );
};


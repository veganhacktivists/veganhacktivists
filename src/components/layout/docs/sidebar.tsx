import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import getThemeColor from '../../../lib/helpers/theme';
import type { IDocsCategoryFields } from '../../../types/generated/contentful';

interface CategoryTreeItem {
  category: IDocsCategoryFields;
  children: this[];
}

const buildCategoryTree: (
  categories: IDocsCategoryFields[]
) => CategoryTreeItem[] = (categories) => {
  const cats: CategoryTreeItem[] = [];
  const categoryPosition: Record<string, CategoryTreeItem> = {};

  categories.forEach((category) => {
    if (!category.parent) {
      cats.push({
        category,
        children: [],
      });

      categoryPosition[category.slug] = cats[cats.length - 1];
      return;
    }

    const parent = categoryPosition[category.parent.fields.slug];

    parent.children.push({
      category,
      children: [],
    });

    categoryPosition[category.slug] =
      parent.children[parent.children.length - 1];
  });
  return cats;
};

interface SidebarProps {
  categories: IDocsCategoryFields[];
  selectedCategory: IDocsCategoryFields['slug'];
  onSelectCategory: (slug: IDocsCategoryFields['slug']) => void;
}

interface CategoryProps {
  item: CategoryTreeItem;
  level?: number;
  color?: string;
  onChangeSelected?: (selected: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const categoriesTree = useMemo(
    () => buildCategoryTree(categories),
    [categories]
  );

  const Category: React.FC<CategoryProps> = ({
    item,
    color,
    onChangeSelected = () => ({}),
    level = 0,
  }) => {
    const selected = item.category.slug === selectedCategory;
    const categoryColor = item.category.color || color;
    const lightGrey = getThemeColor('grey-light');

    const [isChildSelected, setIsChildSelected] = useState(false);

    const shouldHighlight = selected || isChildSelected;

    useEffect(() => {
      onChangeSelected(isChildSelected || selected);
    }, [selected, isChildSelected]);

    return (
      <div
        className={classNames('pl-5', {
          'border-l-4': level === 1,
          'my-2': level === 1,
        })}
        style={{ borderColor: shouldHighlight ? categoryColor : lightGrey }}
      >
        <div
          onClick={() => {
            onSelectCategory(item.category.slug);
          }}
          className={classNames('cursor-pointer w-min px-2 py-1', {
            'font-mono text-2xl font-bold text-white': level === 0,
            'text-xl font-bold': level === 1,
          })}
          style={{
            backgroundColor:
              level === 0 ? categoryColor || lightGrey : undefined,
          }}
        >
          {item.category.name}
        </div>
        <div>
          {item.children.map((child) => (
            <Category
              key={child.category.slug}
              item={child}
              level={level + 1}
              color={categoryColor}
              onChangeSelected={(selected) => {
                setIsChildSelected(selected);
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="sticky left-0 top-0 w-1/4 max-h-screen overflow-auto text-left p-10 h-screen">
      {categoriesTree.map((item) => {
        return <Category key={item.category.slug} item={item} />;
      })}
    </div>
  );
};

export default Sidebar;

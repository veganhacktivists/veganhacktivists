import classNames from 'classnames';
import { useMemo } from 'react';
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

  const Category: React.FC<CategoryProps> = ({ item }) => {
    const active = item.category.slug === selectedCategory;

    return (
      <div className="ml-5">
        <div
          onClick={() => {
            onSelectCategory(item.category.slug);
          }}
          className={classNames('cursor-pointer', { 'bg-grey': active })}
        >
          {item.category.name}
        </div>
        <div>
          {item.children.map((child) => (
            <Category key={child.category.slug} item={child} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="sticky left-0 top-0 w-1/4 max-h-screen overflow-auto text-left px-10">
      {categoriesTree.map((item) => {
        return <Category key={item.category.slug} item={item} />;
      })}
    </div>
  );
};

export default Sidebar;

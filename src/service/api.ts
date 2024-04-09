import {Alert} from 'react-native';
import {supabase} from '../../App';
import {
  IFullLedgerCategory,
  ILedger,
  ILedgerCategory,
  ISubCategory,
  ITransaction,
  LedgerCategoryType,
  PeriodType,
} from '../constant';
import {isNilOrEmpty} from 'ramda-adjunct';

export const getApplicationData = async () => {
  const ledgerIdList: number[] = [];
  let ledgerJson: {
    [id: number]: ILedger;
  } = {};

  let categoryJson: {
    [id: number]: ILedgerCategory;
  } = {};

  let subCategoryJson: {
    [id: number]: ISubCategory;
  } = {};

  let transactionIdList: {
    [ledgerId: number]: number[];
  } = {};

  let transactionJson: {
    [id: number]: ITransaction;
  } = {};

  try {
    const {data: ledgers = []} = await supabase
      .from('ledgers')
      .select(
        '*, categories(*, sub_categories(*), budgets(*)), transactions(*), currencies(*)',
      );

    for (const ledger of ledgers || []) {
      ledgerIdList.push(ledger?.id);

      const categories = ledger?.categories || [];
      const categoryIdList: number[] = [];
      const transactionList = ledger?.transactions || [];
      const transactionIdByLedgerList: number[] = [];

      for (const category of categories) {
        categoryIdList.push(category.id);

        const subCategories = category.sub_categories || [];
        const subCategoryIdList: number[] = [];

        for (const subCategory of subCategories) {
          subCategoryIdList.push(subCategory.id);
          subCategoryJson = {
            ...subCategoryJson,
            [subCategory.id]: {
              id: subCategory.id,
              name: subCategory.name,
            },
          };
        }

        categoryJson = {
          ...categoryJson,
          [category.id]: {
            id: category?.id,
            name: category?.name,
            icon: category?.icon,
            color: category?.color,
            type: category?.type as LedgerCategoryType,
            budget: {
              id: category?.budgets?.id,
              cost: category?.budgets?.cost!,
              period: category?.budgets?.period! as PeriodType,
              startDate: category?.budgets?.start_date!,
              budgetCycle: category?.budgets?.budget_cycle!,
            },
            subCategoryIdList,
          },
        };
      }

      for (const transaction of transactionList) {
        transactionIdByLedgerList.push(transaction.id);

        transactionJson = {
          ...transactionJson,
          [transaction.id]: {
            id: transaction?.id,
            ledgerId: transaction?.ledger_id,
            cost: transaction?.cost,
            type: transaction?.type as LedgerCategoryType,
            categoryId: transaction?.category_id,
            subCategoryId: transaction?.sub_category_id,
            time: transaction?.time!,
            note: transaction?.note!,
          },
        };
      }

      transactionIdList = {
        ...transactionIdList,
        [ledger?.id]: transactionIdByLedgerList,
      };

      ledgerJson = {
        ...ledgerJson,
        [ledger?.id]: {
          id: ledger?.id,
          name: ledger?.name,
          icon: ledger?.icon,
          color: ledger?.color,
          currency: {
            id: ledger?.currencies?.id!,
            name: ledger?.currencies?.name!,
            symbol: ledger?.currencies?.symbol!,
          },
          categoryIdList,
        },
      };
    }
  } catch (error) {
    Alert.alert(JSON.stringify(error));
  } finally {
    return {
      ledgerIdList,
      ledgerJson,
      categoryJson,
      subCategoryJson,
      transactionIdList,
      transactionJson,
    };
  }
};

export const addTransaction = async (transaction: Omit<ITransaction, 'id'>) => {
  try {
    const {error, data} = await supabase
      .from('transactions')
      .insert({
        category_id: transaction?.categoryId!,
        cost: transaction?.cost!,
        ledger_id: transaction?.ledgerId!,
        sub_category_id: transaction?.subCategoryId!,
        time: transaction?.time!,
        type: transaction?.type!,
        user_id: (await supabase?.auth.getUser()).data?.user?.id!,
        note: transaction?.note!,
      })
      .select();

    if (error) {
      return Alert.alert(error?.code || 'Error', error?.message);
    }

    return data?.[0]?.id;
  } catch (error) {
    Alert.alert('Error', JSON.stringify(error));
  }
};

export const deleteTransaction = async (transactionId: number) => {
  try {
    const {error} = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId);

    if (error) {
      return Alert.alert(error?.code || 'Error', error?.message);
    }
  } catch (error) {
    Alert.alert('Error', JSON.stringify(error));
  }
};

export const addCategory = async (
  category: Omit<ILedgerCategory, 'subCategoryIdList'>,
  ledgerId: number,
) => {
  try {
    let budgetId: number | null = null;

    if (category?.budget.cost >= 0) {
      const {data} = await supabase
        .from('budgets')
        .insert({
          cost: category?.budget?.cost,
          period: category?.budget?.period,
          start_date: category?.budget?.startDate,
          budget_cycle: category?.budget?.budgetCycle,
          user_id: (await supabase?.auth.getUser()).data?.user?.id!,
        })
        .select();

      budgetId = data?.[0]?.id!;
    }

    const {error, data} = await supabase
      .from('categories')
      .insert({
        name: category?.name,
        icon: category?.icon,
        color: category?.color,
        type: category?.type,
        ledger_id: ledgerId,
        budget_id: budgetId,
        user_id: (await supabase?.auth.getUser()).data?.user?.id!,
      })
      .select();

    if (error) {
      Alert.alert(error?.code || 'Error', error?.message);
      return 0;
    }

    return data?.[0]?.id;
  } catch (error) {
    Alert.alert('Error', JSON.stringify(error));
    return 0;
  }
};

export const updateCategory = async (
  category: Omit<ILedgerCategory, 'subCategoryIdList'>,
) => {
  try {
    let budgetId = category?.budget?.id;
    if (isNilOrEmpty(category?.budget?.id)) {
      const {data} = await supabase
        .from('budgets')
        .insert({
          cost: category?.budget?.cost || 0,
          period: category?.budget?.period,
          start_date: category?.budget?.startDate,
          budget_cycle: category?.budget?.budgetCycle,
          user_id: (await supabase?.auth.getUser()).data?.user?.id!,
        })
        .select();
      budgetId = data?.[0]?.id!;
    } else {
      await supabase
        .from('budgets')
        .update({
          cost: category?.budget?.cost || 0,
          period: category?.budget?.period,
          start_date: category?.budget?.startDate,
          budget_cycle: category?.budget?.budgetCycle,
        })
        .eq('id', category?.budget?.id!)
        .select();
    }

    const {error, data} = await supabase
      .from('categories')
      .update({
        name: category?.name,
        icon: category?.icon,
        color: category?.color,
        type: category?.type,
        budget_id: budgetId,
      })
      .eq('id', category?.id!)
      .select();

    if (error) {
      Alert.alert(error?.code || 'Error', error?.message);
      return 0;
    }

    return data?.[0]?.id;
  } catch (error) {
    Alert.alert('Error', JSON.stringify(error));
    return 0;
  }
};

export const addCategoryList = async (
  categoryList: IFullLedgerCategory[],
  ledgerId: number,
) => {
  try {
    const categories = [];

    for (const category of categoryList) {
      let budgetId: number | null = null;

      if (category?.budget.cost > 0) {
        const {data} = await supabase
          .from('budgets')
          .insert({
            cost: category?.budget?.cost,
            period: category?.budget?.period,
            start_date: category?.budget?.startDate,
            budget_cycle: category?.budget?.budgetCycle,
            user_id: (await supabase?.auth.getUser()).data?.user?.id!,
          })
          .select();

        budgetId = data?.[0]?.id!;
      }
      categories.push({
        name: category?.name,
        icon: category?.icon,
        color: category?.color,
        type: category?.type,
        ledger_id: ledgerId,
        budget_id: budgetId,
        user_id: (await supabase?.auth.getUser()).data?.user?.id!,
      });
    }

    const {error, data} = await supabase
      .from('categories')
      .insert(categories)
      .select();

    if (error) {
      Alert.alert(error?.code || 'Error', error?.message);
      return [];
    }

    return data;
  } catch (error) {
    Alert.alert('Error', JSON.stringify(error));
    return [];
  }
};

export const addSubCategory = async (
  subCategory: ISubCategory,
  categoryId: number,
) => {
  try {
    const {error, data} = await supabase
      .from('sub_categories')
      .insert({
        name: subCategory?.name,
        user_id: (await supabase?.auth.getUser()).data?.user?.id!,
        category_id: categoryId,
      })
      .select();

    if (error) {
      return Alert.alert(error?.code || 'Error', error?.message);
    }

    return data?.[0]?.id;
  } catch (error) {
    Alert.alert('Error', JSON.stringify(error));
  }
};

export const updateSubCategory = async (subCategory: ISubCategory) => {
  try {
    const {error, data} = await supabase
      .from('sub_categories')
      .update({
        name: subCategory?.name,
      })
      .eq('id', subCategory?.id!)
      .select();

    if (error) {
      return Alert.alert(error?.code || 'Error', error?.message);
    }

    return data?.[0]?.id;
  } catch (error) {
    Alert.alert('Error', JSON.stringify(error));
  }
};

export const addSubCategoryList = async (
  subCategoryList: ISubCategory[],
  categoryId: number,
) => {
  try {
    const subCategories = [];
    for (const subCategory of subCategoryList) {
      subCategories.push({
        name: subCategory?.name,
        user_id: (await supabase?.auth.getUser()).data?.user?.id!,
        category_id: categoryId,
      });
    }

    const {error, data} = await supabase
      .from('sub_categories')
      .insert(subCategories)
      .select();

    if (error) {
      return Alert.alert(error?.code || 'Error', error?.message);
    }

    return data;
  } catch (error) {
    Alert.alert('Error', JSON.stringify(error));
  }
};

export const addLedger = async (
  ledger: Omit<ILedger, 'id' | 'categoryIdList'>,
) => {
  try {
    const {error, data} = await supabase
      .from('ledgers')
      .insert({
        name: ledger?.name,
        color: ledger.color,
        currency_id: ledger?.currency?.id,
        icon: ledger?.icon,
        user_id: (await supabase?.auth.getUser()).data?.user?.id!,
      })
      .select();

    if (error) {
      return Alert.alert(error?.code || 'Error', error?.message);
    }

    return data?.[0]?.id;
  } catch (error) {
    Alert.alert('Error', JSON.stringify(error));
  }
};

export const updateLedger = async (ledger: Omit<ILedger, 'categoryIdList'>) => {
  try {
    const {error, data} = await supabase
      .from('ledgers')
      .update({
        name: ledger?.name,
        color: ledger.color,
        currency_id: ledger?.currency?.id,
        icon: ledger?.icon,
      })
      .eq('id', ledger?.id)
      .select();

    if (error) {
      return Alert.alert(error?.code || 'Error', error?.message);
    }

    return data?.[0]?.id;
  } catch (error) {
    Alert.alert('Error', JSON.stringify(error));
  }
};

export const deleteLedger = async (input: {
  ledgerId: number;
  categoryIdList: number[];
  subCategoryIdList: number[];
  budgetIdList: number[];
}) => {
  const {ledgerId, categoryIdList, subCategoryIdList, budgetIdList} = input;
  try {
    await supabase.from('transactions').delete().eq('ledger_id', ledgerId);
    await supabase.from('budgets').delete().in('id', budgetIdList);
    await supabase.from('sub_categories').delete().in('id', subCategoryIdList);
    await supabase.from('categories').delete().in('id', categoryIdList);
    await supabase.from('budgets').delete().in('id', budgetIdList);
    const {error} = await supabase.from('ledgers').delete().eq('id', ledgerId);

    if (error) {
      return Alert.alert(error?.code || 'Error', error?.message);
    }
  } catch (error) {
    Alert.alert('Error', JSON.stringify(error));
  }
};

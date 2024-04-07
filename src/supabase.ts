export type Json =
  | string
  | number
  | boolean
  | null
  | {[key: string]: Json | undefined}
  | Json[];

export type Database = {
  public: {
    Tables: {
      budgets: {
        Row: {
          budget_cycle: number | null;
          cost: number;
          created_at: string;
          deleted_at: string | null;
          id: number;
          period: string;
          start_date: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          budget_cycle?: number | null;
          cost: number;
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          period: string;
          start_date?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          budget_cycle?: number | null;
          cost?: number;
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          period?: string;
          start_date?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_budgets_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      categories: {
        Row: {
          budget_id: number | null;
          color: string;
          created_at: string;
          deleted_at: string | null;
          icon: string;
          id: number;
          ledger_id: number;
          name: string;
          type: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          budget_id?: number | null;
          color: string;
          created_at?: string;
          deleted_at?: string | null;
          icon: string;
          id?: number;
          ledger_id: number;
          name: string;
          type: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          budget_id?: number | null;
          color?: string;
          created_at?: string;
          deleted_at?: string | null;
          icon?: string;
          id?: number;
          ledger_id?: number;
          name?: string;
          type?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_categories_budget_id_fkey';
            columns: ['budget_id'];
            isOneToOne: false;
            referencedRelation: 'budgets';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_categories_ledger_id_fkey';
            columns: ['ledger_id'];
            isOneToOne: false;
            referencedRelation: 'ledgers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_categories_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      currencies: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: number;
          name: string;
          symbol: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          name: string;
          symbol: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          name?: string;
          symbol?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ledgers: {
        Row: {
          color: string;
          created_at: string;
          currency_id: number;
          deleted_at: string | null;
          icon: string;
          id: number;
          name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          color: string;
          created_at?: string;
          currency_id: number;
          deleted_at?: string | null;
          icon: string;
          id?: number;
          name: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          color?: string;
          created_at?: string;
          currency_id?: number;
          deleted_at?: string | null;
          icon?: string;
          id?: number;
          name?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_ledgers_currency_id_fkey';
            columns: ['currency_id'];
            isOneToOne: false;
            referencedRelation: 'currencies';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_ledgers_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      sub_categories: {
        Row: {
          category_id: number;
          created_at: string;
          deleted_at: string | null;
          id: number;
          name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          category_id: number;
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          name: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          category_id?: number;
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          name?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_sub_categories_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_sub_categories_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      transactions: {
        Row: {
          category_id: number;
          cost: number;
          created_at: string;
          deleted_at: string | null;
          id: number;
          ledger_id: number;
          note: string | null;
          sub_category_id: number;
          type: string;
          time: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          category_id: number;
          cost: number;
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          ledger_id: number;
          note?: string | null;
          sub_category_id: number;
          type: string;
          time: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          category_id?: number;
          cost?: number;
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          ledger_id?: number;
          note?: string | null;
          sub_category_id?: number;
          type?: string;
          time: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_transactions_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_transactions_ledger_id_fkey';
            columns: ['ledger_id'];
            isOneToOne: false;
            referencedRelation: 'ledgers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_transactions_sub_category_id_fkey';
            columns: ['sub_category_id'];
            isOneToOne: false;
            referencedRelation: 'sub_categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_transactions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | {schema: keyof Database},
  EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;

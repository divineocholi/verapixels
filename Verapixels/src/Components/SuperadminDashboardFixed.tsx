import { supabase } from './supabase';
import SuperadminDashboard from './SuperadminDashboard'; // Removed 'type' keyword

// Helper function to safely fetch count from Supabase
export const safeCount = async (table: string, filters?: Record<string, any>): Promise<number> => {
  try {
    let query = supabase.from(table).select('*', { count: 'exact', head: true });
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }
    
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.log(`Count from ${table} failed:`, error);
    return 0;
  }
};

// Helper function to safely fetch data from Supabase
export const safeSelect = async <T = any>(table: string, columns: string = '*'): Promise<T[]> => {
  try {
    const response = await supabase.from(table).select(columns);
    
    if (response.error) {
      console.log(`Select from ${table} failed:`, response.error);
      return [];
    }
    
    // Cast the data to the expected type
    return response.data as T[];
  } catch (error) {
    console.log(`Select from ${table} failed with exception:`, error);
    return [];
  }
};

// Helper function to safely insert data
export const safeInsert = async <T = any>(table: string, data: Partial<T>): Promise<T | null> => {
  try {
    const { data: insertedData, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return insertedData as T;
  } catch (error) {
    console.log(`Insert into ${table} failed:`, error);
    return null;
  }
};

// Helper function to safely update data
export const safeUpdate = async <T = any>(table: string, id: string, updates: Partial<T>): Promise<T | null> => {
  try {
    const { data: updatedData, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return updatedData as T;
  } catch (error) {
    console.log(`Update ${table} with id ${id} failed:`, error);
    return null;
  }
};

// Helper function to safely delete data
export const safeDelete = async (table: string, id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(`Delete from ${table} with id ${id} failed:`, error);
    return false;
  }
};

// Export the component as default
export default SuperadminDashboard;
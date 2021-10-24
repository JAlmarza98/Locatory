import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from 'src/environments/environment';
import {Categoria, ICategoria, UpdateCategoryData} from 'src/app/models';

const url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        Authorization: this.token,
      },
    };
  }

  getUserCategories(page?: number) {
    if (page) {
      return this.http.get(`${url}/api/categories?page=${page}`, this.headers);
    } else {
      return this.http.get(`${url}/api/categories`, this.headers);
    }
  }

  newCategory(category: ICategoria) {
    return this.http.post(`${url}/api/categories`, category, this.headers);
  }

  deleteCategory(category: Categoria) {
    return this.http.delete(`${url}/api/categories/${category.id}`, this.headers);
  }

  updateCategory(categoryId: string, data:UpdateCategoryData) {
    return this.http.put(`${url}/api/categories/${categoryId}`, data, this.headers);
  }
}

package gift.controller;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import gift.service.ProductService;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

@WebMvcTest(controllers = ProductController.class)
class ProductControllerTest {

    @MockBean
    private ProductService productService;

    @Autowired
    private MockMvc mvc;

    @DisplayName("[GET] 모든 상품 정보를 조회한다.")
    @Test
    void productList() throws Exception {
        //given
        given(productService.getProducts()).willReturn(List.of());

        //when
        ResultActions result = mvc.perform(get("/api/products")
            .contentType(MediaType.APPLICATION_JSON));

        //then
        result
            .andExpect(status().isOk());

        then(productService).should().getProducts();
    }

}

package com.top.coder.yiqi.yjdemo.source;

import com.alibaba.druid.pool.DruidDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.Properties;

/**
 * Author: hanyu
 * Create: 2017/11/10
 * mailto:hanyu100@foxmail.com
 */
@Configuration
@MapperScan(basePackages = {"com.abtnetworks.data.totems.topology.basic.node.dao","com.abtnetworks.data.totems.topology.basic.policy.dao"}, sqlSessionTemplateRef  = "MasterSqlSessionTemplate")
public class MasterDataSource {
//    @ConfigurationProperties(prefix = "spring.datasource")
    @Value("${spring.datasource.url}")
    private String url;
    @Value("${spring.datasource.username}")
    private String user;
    @Value("${spring.datasource.password}")
    private String password;
    @Value("${spring.datasource.driver-class-name}")
    private String driverClass;
    private int initialSize=5;
    private int minIdle=5;
    private int maxActive=20;
    private int maxWait=6000;
    private int timeBetweenEvictionRunsMillis=60000;
    private int minEvictableIdleTimeMillis=300000;
    private String validationQuery="SELECT 1 FROM DUAL";
    private boolean testWhileIdle=true;
    private boolean testOnBorrow=false;
    private boolean testOnReturn=false;
    private boolean poolPreparedStatements=true;
    private int maxPoolPreparedStatementPerConnectionSize=20;
    private String filters="stat,wall,log4j";
    private String connectionProperties="druid.stat.mergeSql=true;druid.stat.slowSqlMillis=5000";

    @Bean(name = "MasterDataSource")
    public DataSource DataSource() {
        DruidDataSource datasource = new DruidDataSource();
        datasource.setDriverClassName(driverClass);
        datasource.setUrl(url);
        datasource.setUsername(user);
        datasource.setPassword(password);

        //configuration
        datasource.setInitialSize(initialSize);
        datasource.setMinIdle(minIdle);
        datasource.setMaxActive(maxActive);
        datasource.setMaxWait(maxWait);
        datasource.setTimeBetweenEvictionRunsMillis(timeBetweenEvictionRunsMillis);
        datasource.setMinEvictableIdleTimeMillis(minEvictableIdleTimeMillis);
        datasource.setValidationQuery(validationQuery);
        datasource.setTestWhileIdle(testWhileIdle);
        datasource.setTestOnBorrow(testOnBorrow);
        datasource.setTestOnReturn(testOnReturn);
        datasource.setPoolPreparedStatements(poolPreparedStatements);
        datasource.setMaxPoolPreparedStatementPerConnectionSize(maxPoolPreparedStatementPerConnectionSize);
        try {
            datasource.setFilters(filters);
        } catch (SQLException e) {
            System.err.println("druid configuration initialization filter: "+ e);
        }
        datasource.setConnectionProperties(connectionProperties);
        return datasource;
//        return dataSource;
//        return DataSourceBuilder.create().build();
    }

    @Bean(name = "MasterSqlSessionFactory")
    public SqlSessionFactory MasterSqlSessionFactory(@Qualifier("MasterDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        Properties properties = new Properties();
        sessionFactory.setDataSource(dataSource);
        sessionFactory.setConfigLocation(new ClassPathResource("mybatis-config.xml"));
        return sessionFactory.getObject();
    }
    @Bean(name = "MasterTransactionManager")
    public PlatformTransactionManager testTransactionManager(@Qualifier("MasterDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
    @Bean(name = "MasterSqlSessionTemplate")
    public SqlSessionTemplate SqlSessionTemplate(@Qualifier("MasterSqlSessionFactory") SqlSessionFactory sqlSessionFactory) throws Exception {
        return new SqlSessionTemplate(sqlSessionFactory);
    }

}
